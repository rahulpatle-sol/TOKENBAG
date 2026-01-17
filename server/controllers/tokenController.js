const { createClient } = require('@supabase/supabase-js');
const { encryptKey, decryptKey } = require('../utils/crypto');
const { Opik } = require('opik');

const supabase = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL, process.env.SUPABASE_SERVICE_ROLE_KEY);
const opik = new Opik({ projectName: "token-bag-production" });

exports.createBag = async (req, res) => {
  try {
    let { apiKey, userId, email } = req.body;
    
    // Agar body mein key nahi hai, toh .env wali uthao
    const keyToStore = apiKey || process.env.GROQ_API_KEY;

    if (!keyToStore || !keyToStore.startsWith("gsk_")) {
        return res.status(400).json({ error: "Bhai, valid Groq key nahi mili!" });
    }

    const encrypted = encryptKey(keyToStore.trim());
    const bagId = Math.floor(10000000 + Math.random() * 90000000); 

    const { error } = await supabase
      .from('token_bags')
      .insert([{ 
        bag_id: bagId, 
        user_id: userId, 
        owner_email: email, 
        encrypted_key: encrypted 
      }]);

    if (error) throw error;
    res.json({ success: true, bagId });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.useAI = async (req, res) => {
  const { bagId, prompt } = req.body;
  const trace = opik.trace({ name: "groq_final_fix", input: { bagId, prompt } });

  try {
    const { data: bag, error } = await supabase.from('token_bags').select('*').eq('bag_id', bagId).single();
    if (error || !bag) throw new Error("Bag ID galat hai!");

    // SAHI LOGIC: Decrypt karke variable mein save karo
    const decryptedKey = decryptKey(bag.encrypted_key);

    if (!decryptedKey) {
        throw new Error("Key decrypt nahi ho payi. Check ENCRYPTION_SECRET.");
    }

    const response = await fetch("https://api.groq.com/openai/v1/chat/completions", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${decryptedKey}`, // Yahan decrypted key jayegi
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        model: "llama-3.3-70b-versatile",
        messages: [{ role: "user", content: prompt }]
      })
    });

    const data = await response.json();

    if (data.error) {
      throw new Error("Groq Error: " + data.error.message);
    }

    const responseText = data.choices[0].message.content;
    trace.end({ output: responseText });
    
    res.json({ success: true, text: responseText });

  } catch (err) {
    trace.end({ output: "Error: " + err.message });
    res.status(500).json({ error: err.message });
  }
};