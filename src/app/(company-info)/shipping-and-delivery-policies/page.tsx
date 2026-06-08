import Link from "next/link";

export default function ShippingDeliveryPolicies() {
  return (
    <div className="shipping-and-delivery-policies">
      <h1>Shipping & Delivery Policies</h1>

      <p>You'll receive a tracking link via email when your order ships out. If you have any questions about your tracking or shipment, then <Link href="/contact-us" className="underline">contact us</Link>.</p>

      <h2>When will I get my order?</h2>

      <p>Usually, it takes 3–7 days to fulfill an order, after which it's shipped out. The shipping time depends on your location, but can be estimated as follows:</p>

      <ul>
        <li>USA: 3–4 business days</li>
        <li>Europe: 6–8 business days</li>
        <li>Australia: 2–14 business days</li>
        <li>Japan: 4–8 business days</li>
        <li>International: 10–20 business days</li>
      </ul>

      <h2>Will I be charged customs for my order?</h2>

      <p>An additional customs and tax fee can occur on international orders. This fee is not in our control and is assessed by your local customs office. Customs policies vary widely for every country so please check with your local customs office directly to see if they apply duties and taxes to your purchases.</p>

      <h2 id="lost-in-transit">My order might be lost in transit. What should I do?</h2>

      <p>Before submitting a problem report, please help us out by doing the following:</p>

      <ul>
        <li>Check your shipping confirmation email for any mistakes in the delivery address</li>
        <li>Ask your local post office if they have your package</li>
        <li>Stop by your neighbors in case the courier left the package with them</li>
      </ul>

      <p>If the shipping address was correct, and the package wasn't left at the post office or at your neighbor's, then <Link href="/returns-exchanges-refunds#problem-report" className="underline">submit a problem report</Link> and we will get is sorted out as quickly as possible.</p>

      <p>If you did find a mistake in your delivery address, we can send you a replacement order, but shipping will be at your own cost.</p>

      <h2>Wrong Address</h2>

      <p>If you provide an address that is considered insufficient by the courier, the shipment will be returned to our facility. You will be responsible for reshipment costs once we have confirmed an updated address with you (if and as applicable).</p>

      <h2>Unclaimed Shipments</h2>

      <p>Shipments that go unclaimed are returned to our facility and you will be responsible for the cost of a reshipment to yourself (if and as applicable).</p>
    </div>
  )
}
