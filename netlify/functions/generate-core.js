exports.handler = async (event) => {
  try {
    const body = event.body ? JSON.parse(event.body) : {};
    const cozy = (body?.parentProfile?.cozyPhrase || 'kiddo').toLowerCase();
    const persona = (body?.teenProfile?.personality || 'Mixed').toLowerCase();
    const moment = body?.moment?.title || 'a tough moment';

    const pick = (arr) => arr[Math.floor(Math.random() * arr.length)];

    const openers = {
      quiet: [
        `Oh ${cozy}, thanks for telling me—${moment} can really sting.`,
        `${cozy}, I’m glad you told me. ${moment} can feel heavy.`
      ],
      outgoing: [
        `Hey ${cozy}, I hear you—${moment} can be rough.`,
        `${cozy}, that took guts to share—${moment} hurts.`
      ],
      mixed: [
        `Oh ${cozy}, that’s a lot—${moment} really stings.`,
        `${cozy}, thanks for trusting me—${moment} is tough.`
      ]
    };

    const validates = {
      quiet: [
        `It makes total sense to feel that way.`,
        `Anyone would feel that—you're not alone.`
      ],
      outgoing: [
        `Totally get it—I’d feel that too.`,
        `Makes sense to be upset—I’m with you.`
      ],
      mixed: [
        `I get why that feels heavy—I'm on your side.`,
        `That reaction makes sense—I’m here.`
      ]
    };

    const choices = {
      quiet: [
        `Want a quiet hug or a short walk while we think next steps?`,
        `A calm hug or a little walk—what feels better?`
      ],
      outgoing: [
        `Want to talk it through or take a quick walk while we plan?`,
        `Chat it out or a fast walk—your pick.`
      ],
      mixed: [
        `Want a hug or a quick walk while we think next steps?`,
        `Hug or small walk—what helps right now?`
      ]
    };

    const bucket = persona.includes('quiet') ? 'quiet'
                  : persona.includes('out') ? 'outgoing'
                  : 'mixed';

    const lines = [
      pick(openers[bucket]),
      pick(validates[bucket]),
      pick(choices[bucket])
    ];

    return {
      statusCode: 200,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        version: process.env.SAGEDASH_ACTIVE_PROMPT_VERSION || "mock-6.1",
        lines,
        meta: { stub: true }
      })
    };
  } catch (e) {
    return { statusCode: 500, body: JSON.stringify({ error: String(e) }) };
  }
};
