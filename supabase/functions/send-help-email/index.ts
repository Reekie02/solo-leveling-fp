import "jsr:@supabase/functions-js/edge-runtime.d.ts";

const RESEND_API_KEY = Deno.env.get("RESEND_API_KEY");
const TO_EMAIL = Deno.env.get("HELP_TO_EMAIL");
const FROM_EMAIL = Deno.env.get("HELP_FROM_EMAIL");

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type",
};

Deno.serve(async (req) => {
  // 🔹 Risponde alle preflight request (OBBLIGATORIO)
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    if (req.method !== "POST") {
      return json({ error: "Method not allowed" }, 405);
    }

    if (!RESEND_API_KEY || !TO_EMAIL || !FROM_EMAIL) {
      return json({ error: "Server not configured" }, 500);
    }

    const { name, email, message } = await req.json();

    if (!name || !email || !message) {
      return json({ error: "Missing fields" }, 400);
    }

    const subject = `Help request from ${name}`;
    const html = `
  <div style="margin:0;padding:0;background:#0b0f1a;">
    <table role="presentation" cellpadding="0" cellspacing="0" border="0" width="100%" style="background:#0b0f1a;">
      <tr>
        <td align="center" style="padding:22px;">
          <table role="presentation" cellpadding="0" cellspacing="0" border="0" width="600" style="width:600px;max-width:600px;background:#0a1224;border:1px solid #1f2a44;border-radius:14px;overflow:hidden;">
            

            <tr>
              <td style="padding:18px 20px;background:#0f1a33;border-bottom:1px solid #1f2a44;">
                <div style="font-size:11px;letter-spacing:0.35em;text-transform:uppercase;color:#9fb0d0;font-family:Arial,Segoe UI,Roboto,sans-serif;">
                  SYSTEM NOTIFICATION
                </div>
                <div style="margin-top:8px;font-size:22px;font-weight:800;color:#eef2ff;font-family:Arial,Segoe UI,Roboto,sans-serif;">
                  New Help Request
                </div>
              </td>
            </tr>


            <tr>
              <td style="padding:18px 20px;font-family:Arial,Segoe UI,Roboto,sans-serif;color:#eef2ff;">
                
                <!-- Badge -->
                <table role="presentation" cellpadding="0" cellspacing="0" border="0" style="margin:0 0 14px 0;">
                  <tr>
                    <td style="padding:6px 10px;border:1px solid #2b3a63;border-radius:999px;background:#0b1631;font-size:11px;letter-spacing:0.18em;text-transform:uppercase;color:#eab308;">
                      S-RANK TICKET • OPENED
                    </td>
                  </tr>
                </table>


                <table role="presentation" cellpadding="0" cellspacing="0" border="0" width="100%" style="margin-bottom:12px;border:1px solid #243252;border-radius:12px;background:#0b1631;">
                  <tr>
                    <td style="padding:14px 14px;">
                      <div style="font-size:12px;letter-spacing:0.22em;text-transform:uppercase;color:#9fb0d0;margin-bottom:6px;">
                        PLAYER NAME
                      </div>
                      <div style="font-size:16px;font-weight:700;color:#eef2ff;">
                        ${escapeHtml(name)}
                      </div>
                    </td>
                  </tr>
                </table>


                <table role="presentation" cellpadding="0" cellspacing="0" border="0" width="100%" style="margin-bottom:12px;border:1px solid #243252;border-radius:12px;background:#0b1631;">
                  <tr>
                    <td style="padding:14px 14px;">
                      <div style="font-size:12px;letter-spacing:0.22em;text-transform:uppercase;color:#9fb0d0;margin-bottom:6px;">
                        CONTACT EMAIL
                      </div>
                      <div style="font-size:15px;">
                        <a href="mailto:${encodeURIComponent(email)}" style="color:#60a5fa;text-decoration:underline;">
                          ${escapeHtml(email)}
                        </a>
                      </div>
                    </td>
                  </tr>
                </table>


                <table role="presentation" cellpadding="0" cellspacing="0" border="0" width="100%" style="border:1px solid #2b3a63;border-radius:12px;background:#071024;">
                  <tr>
                    <td style="padding:14px 14px;">
                      <div style="font-size:12px;letter-spacing:0.22em;text-transform:uppercase;color:#eab308;margin-bottom:8px;">
                        MESSAGE CONTENT
                      </div>
                      <div style="font-size:14px;line-height:1.6;color:#eef2ff;">
                        ${escapeHtml(message)}
                      </div>
                    </td>
                  </tr>
                </table>

              </td>
            </tr>


            <tr>
              <td style="padding:14px 20px;background:#0f1a33;border-top:1px solid #1f2a44;text-align:center;">
                <div style="font-size:11px;color:#9fb0d0;font-family:Arial,Segoe UI,Roboto,sans-serif;">
                  This message was generated by the System.<br/>
                  Solo Leveling — Help Interface
                </div>
              </td>
            </tr>

          </table>
        </td>
      </tr>
    </table>
  </div>
`;

    const resp = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${RESEND_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from: FROM_EMAIL,
        to: [TO_EMAIL],
        reply_to: email,
        subject,
        html,
      }),
    });

    if (!resp.ok) {
      return json(
        { error: "Resend failed", details: await resp.text() },
        502
      );
    }

    return json({ ok: true }, 200);
  } catch (e) {
    return json(
      { error: "Server error", details: String(e) },
      500
    );
  }
});

function json(obj: unknown, status = 200) {
  return new Response(JSON.stringify(obj), {
    status,
    headers: {
      ...corsHeaders,
      "Content-Type": "application/json",
    },
  });
}

function escapeHtml(input: string) {
  return String(input)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}