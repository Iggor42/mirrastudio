export type EventName = 'page_view' | 'project_viewed' | 'cta_clicked' | 'handoff_to_site';

export function trackEvent(name: EventName, payload: Record<string, any> = {}) {
  try {
    const event = { name, payload, timestamp: new Date().toISOString() };
    
    // Fallback/Buffer no localStorage
    const buffer = JSON.parse(localStorage.getItem('mirra_events') || '[]');
    buffer.push(event);
    localStorage.setItem('mirra_events', JSON.stringify(buffer));

    // Opcional: enviar para API/Webhook, se existir
    fetch('/api/track', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(event)
    }).catch(() => { /* silenciosamente ignorado no frontend se falhar/não existir */ });
  } catch (e) {
    console.error('Analytics error:', e);
  }
}
