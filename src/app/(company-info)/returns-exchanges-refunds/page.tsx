import Link from "next/link";

export default function ReturnsExchangesRefunds() {
  return (
    <div className="returns-exchanges-refunds">
      <h1>Returns, Exchanges, Refunds</h1>

      <p>In an effort to cut waste and reduce overproduction we do not carry inventory. Our products are made specifically for you when you place an order. Considering this fact, our return, exchange, and refund policies are limited. Thank you for making thoughtful purchasing decisions!</p>

      <h2>What's your return and exchange policy?</h2>

      <p>If there is something wrong with your order, then please see the <Link href="#problem-report" className="underline">Submitting a problem report</Link> section below.</p>

      <p>However, since our products are made specifically for you when you place an order, we are unable to offer returns and exchanges for any orders that do not meet the criteria for submitting a problem report.</p>

      <h2>I received misprinted/damaged/defective products, I received the wrong order, or my order is past the delivery date</h2>

      <p>Please see the <Link href="#problem-report" className="underline">Submitting a problem report</Link> section below.</p>

      <h2>Do you offer refunds?</h2>

      <p>Since our products are made specifically for you when you place an order, refunds are only offered to customers that receive the wrong items or damaged items. If any of these apply, please see the <Link href="#problem-report" className="underline">Submitting a problem report</Link> section below.</p>

      <h2>Can I exchange an item for a different size/color?</h2>

      <p>At this time, we don't offer exchanges. If you're unsure which size would fit better, check out our sizing charts—we have one for every item listed on our store, in the product description section. Though rare, it's possible that an item you ordered was mislabeled. If that's the case, please see the <Link href="#problem-report" className="underline">Submitting a problem report</Link> section below.</p>

      <h2 id="problem-report">Submitting a problem report</h2>

      <p>We're so sorry if any of the following situations applies to you:</p>

      <ul>
        <li>The order you received had misprinted/damaged/defective products.</li>
        <li>You received the wrong order.</li>
        <li>Your package was lost in transit (i.e. more than five business days have passed since the estimated delivery date and you still have not received your order).</li>
      </ul>

      <p>If any of these situations applies to you, then please follow the steps below to submit a problem report within 15 days of the delivery date or the estimated delivery date. We're not able to accept reports filed after this timeframe.</p>

      <p>If your package was lost in transit, then please go to our <Link href="/shipping-and-delivery-policies" className="underline">Shipping &amp; Delivery Policies</Link> page and follow the guidelines under the section titled <Link href="/shipping-and-delivery-policies#lost-in-transit" className="underline">My order might be lost in transit. What should I do?</Link> before submitting a problem report.</p>

      <p>Claims deemed an error on our part are covered at our expense.</p>

      <p>To help us resolve this for you quickly, please follow these steps:</p>

      <ol>
        <li>Go to our <Link href="/contact-us" className="underline">Contact Us</Link> page and use either method to contact us.</li>
        <li>Enter <strong>Problem Report</strong> as the subject line.</li>
        <li>Describe the issue in detail.</li>
        <li>Include your order number and any other details you may have about your order.</li>
        <li>If relevant, upload photos. To avoid delays, please include clear images with your initial report. For faster resolution, ensure your photos follow our guidelines. See the <Link href="#photo-guidelines" className="underline">Photo guidelines when submitting a problem report</Link> section below.</li>
      </ol>

      <p>We'll get back to you with a resolution as soon as possible!</p>

      <h2 id="photo-guidelines">Photo guidelines when submitting a problem report</h2>

      <p>To help us resolve your issue quickly and effectively, it's important to submit clear and accurate photos when reporting a problem with your order. This helps avoid follow-up requests for additional photos and speeds up the process.</p>

      <p>Here are the types of photos we need, depending on the issue:</p>

      <ul>
        <li><strong>Print placement issues:</strong> Lay the product flat and take a photo where the entire product is visible, clearly showing the print placement. It's helpful to include a measuring tool (like a ruler or measuring tape) in the photo to show the placement of the print relative to the width or height of the product.</li>
        <li><strong>Print quality issues:</strong> Take a well-lit photo of the affected area, ensuring the print details are clearly visible.</li>
        <li><strong>Damaged products or product defects (e.g., holes, stains):</strong> Include a photo of the damaged or defective part along with at least part of the product's design to help us identify the item.</li>
        <li><strong>Orders with multiple identical products in different sizes:</strong> Make sure the photo shows the size tags along with the affected products.</li>
        <li><strong>Incorrect product received:</strong> Include a photo of the product along with the packing slip visible in the same image.</li>
        <li>
          <strong>Size discrepancies:</strong>
          <ul>
            <li>If the size tag shows a different size than what was ordered, please submit a photo of the product with the size tag visible.</li>
            <li>If the size tag shows the correct size but the product dimensions are off, include photos of the product with a measuring tool, following the <strong>measuring guidelines</strong> in the <strong>Size guide</strong> section, which is found on the product page below the product description.</li>
          </ul>
        </li>
      </ul>

      <h2>Notification for EU consumers</h2>

      <p>According to Article 16(c) and (e) of the Directive 2011/83/EU of the European Parliament and of the Council of 25 October 2011 on consumer rights, the right of withdrawal may not be provided for:</p>

      <ol>
        <li>the supply of goods that are made to the consumer's specifications or are clearly personalized;</li>
        <li>sealed goods which were unsealed after delivery and thus aren't suitable for return due to health protection or hygiene reasons,</li>
      </ol>

      <p>therefore THEGA reserves the right to refuse returns at its sole discretion.</p>

      <p>This Policy shall be governed and interpreted in accordance with the English language, regardless of any translations made for any purpose whatsoever.</p>
    </div>
  )
}
