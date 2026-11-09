import { site } from "@/lib/content";

export default function Contact() {
  const [user, domain] = site.email.split("@");
  return (
    <section className="chapter wrap" id="contact" aria-labelledby="contact-h">
      <div className="talk">
        <div>
          <h2 className="chap" id="contact-h">Let&rsquo;s talk.</h2>
          <p className="ask">Hiring for a backend role, or have a project in mind?</p>
          <a className="mail" id="mail" href={`mailto:${site.email}`}>{user}<wbr />@{domain}</a>
          <div className="mail-row">
            <button className="copy" id="copy" type="button">Copy email</button>
            <span><span id="clock">Based in New Delhi.</span> Open to relocation and remote work.</span>
          </div>
        </div>
        <div className="else">
          <p className="else-h it">Elsewhere</p>
          <ul>
            <li><a className="ar ar-ne" href={site.github} target="_blank" rel="noopener">GitHub</a></li>
            <li><a className="ar ar-ne" href={site.linkedin} target="_blank" rel="noopener">LinkedIn</a></li>
            {site.resume && <li><a className="ar ar-ne" href={site.resume} target="_blank" rel="noopener">Resume</a></li>}
          </ul>
        </div>
      </div>

      {/* Works without JavaScript too: the browser posts straight to Web3Forms, which emails Anshit. */}
      <form className="msg" id="msg" action="https://api.web3forms.com/submit" method="POST">
        <p className="msg-h">Or leave a message here.</p>
        <input type="hidden" name="access_key" value={site.formKey} />
        <input type="hidden" name="subject" value="New message from your portfolio" />
        <input type="hidden" name="from_name" value="Portfolio contact form" />
        <input type="checkbox" name="botcheck" className="hp" tabIndex={-1} autoComplete="off" aria-hidden="true" />
        <div className="field"><label className="label" htmlFor="f-name">Name</label><input id="f-name" name="name" autoComplete="name" required /></div>
        <div className="field"><label className="label" htmlFor="f-email">Email</label><input id="f-email" name="email" type="email" autoComplete="email" required /></div>
        <div className="field full"><label className="label" htmlFor="f-msg">Message</label><textarea id="f-msg" name="message" rows={4} required /></div>
        <div className="send-row">
          <button className="send" type="submit">Send message</button>
          <p className="form-note" id="form-note" role="status" />
        </div>
      </form>
    </section>
  );
}
