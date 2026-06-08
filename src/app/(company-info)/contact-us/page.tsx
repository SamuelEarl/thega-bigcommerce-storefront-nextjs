import Link from "next/link";

export default function ContactUs() {
  return (
    <div className="contact-us">
      <h1>Contact Us</h1>

      <p>Need to get in touch with us? Please contact us either through our <Link href="https://livethega.freshdesk.com" target="_blank" className="underline">Customer Support Portal</Link> or send an email to us at <Link href="mailto:support@livethega.freshdesk.com" className="underline">support@livethega.freshdesk.com</Link>.</p>

      <p>We will get back to you as soon as we can.</p>

      <p>Thank you!</p>

      <p>THEGA Support Team</p>
    </div>
  )
}
