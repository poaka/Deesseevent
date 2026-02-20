import { serve } from "https://deno.land/std@0.168.0/http/server.ts"

const RESEND_API_KEY = Deno.env.get('RESEND_API_KEY')

serve(async (req) => {
  try {
    const { name, email, phone, event_type, event_date, guest_count, budget, message } = await req.json()

    const res = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${RESEND_API_KEY}`
      },
      body: JSON.stringify({
        from: 'Deesse Event <notifications@deesseevent.com>',
        to: ['deesseevent237@gmail.com'],
        subject: `Nouvelle demande de devis - ${name}`,
        html: `
          <h2>Nouvelle demande de devis</h2>
          <p><strong>Nom:</strong> ${name}</p>
          <p><strong>Email:</strong> ${email}</p>
          <p><strong>Téléphone:</strong> ${phone}</p>
          <p><strong>Type d'événement:</strong> ${event_type}</p>
          <p><strong>Date:</strong> ${event_date}</p>
          <p><strong>Nombre d'invités:</strong> ${guest_count}</p>
          <p><strong>Budget:</strong> ${budget || 'Non spécifié'}</p>
          <p><strong>Message:</strong></p>
          <p>${message || 'Aucun message'}</p>
          <hr>
          <p><small>Connectez-vous à l'admin pour gérer cette demande.</small></p>
        `
      })
    })

    const data = await res.json()
    return new Response(JSON.stringify(data), {
      headers: { 'Content-Type': 'application/json' },
      status: 200
    })
  } catch (error) {
    return new Response(JSON.stringify({ error: error.message }), {
      headers: { 'Content-Type': 'application/json' },
      status: 400
    })
  }
})
