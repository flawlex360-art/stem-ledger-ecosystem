const fs = require('fs');

const jsCode = fs.readFileSync('extracted.js', 'utf8');

const evalCode = `
    let appSettings = { schoolName: 'Test', email: 'test@test' };
    let registeredSchools = [{name: 'School A', email: 'a@a'}];
    let currentChatRecipient = 'master';
    let unreadCounts = {};
    let currentView = 'chat';
    let firebase = {};
    let db = {};
    
    // Stub browser things
    function escapeHtml(str) { return str; }
    
` + jsCode + `

    try {
        console.log("Calling chatHTML...");
        const result = chatHTML();
        console.log("chatHTML succeeded. Length:", result.length);
    } catch(e) {
        console.log("ERROR in chatHTML:", e);
    }
`;

fs.writeFileSync('temp_eval.js', evalCode);
