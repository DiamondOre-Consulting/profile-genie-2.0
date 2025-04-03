
export const getDueMail = (daysLeft, fullName, userName) => {
    const dueMailSubject = `Reminder: Your Portfolio Payment is Due in ${daysLeft} Day(s)`

    const dueMailMessage = `
                        <html>
                        <head>
                            <style>
                                body {
                                    font-family: Arial, sans-serif;
                                    background-color: #f4f4f4;
                                    margin: 0;
                                    padding: 0;
                                }
                                .container {
                                    max-width: 500px;
                                    margin: 5px auto;
                                    background: #F2F6FC;
                                    padding: 5px;
                                    border-radius: 8px;
                                    box-shadow: 0 4px 10px rgba(0, 0, 0, 0.8);
                                    overflow: hidden;
                                    border: 1px solid #dddddd;
                                }
                                .header {
                                    text-align: center;
                                    background: linear-gradient(90deg, #0052D4, #4364F7, #6FB1FC);
                                    color: #ffffff;
                                    padding: 10px 5px;
                                    font-size: 18px;
                                    font-weight: bold;
                                    border-radius: 8px 8px 0 0;
                                    position: relative;
                                }
                                .header img {
                                    max-width: 60px;
                                    margin-bottom: 7px;
                                }
                                .content {
                                    padding: 5px;
                                    color: #333333;
                                           font-size: 16px;
                                    line-height: 1.4;
                                }
                                .button {
                                    display: inline-block;
                                    background: #0052D4;
                                    color: #ffffff !important;
                                    padding: 12px 20px;
                                    text-decoration: none;
                                    border-radius: 5px;
                                    font-size: 16px;
                                    font-weight: bold;
                                    margin-top: 20px;
                                }
                                .footer {
                                    text-align: center;
                                    font-size: 16px;
                                    color: #666666;
                                    padding: 15px;
                                    border-top: 1px solid #dddddd;
                                    margin-top: 20px;
                                }
                                .social-icons {
                                    text-align: center;
                                    margin-top: 15px;
                                }
                                .social-icons a {
                                    margin: 0 10px;
                                    display: inline-block;
                                }
                                .social-icons img {
                                    width: 30px;
                                    height: 30px;
                                }
                            </style>
                        </head>
                        <body>
                    
                        <div class="container">
                            <div class="header">
                                <img src="https://www.profilegenie.in/assets/QR~Genie%20logo-CnheCMPa.png" alt="Profile Genie Logo">
                                <br>
                                Portfolio Payment Expiry Notice
                            </div>
                            <div class="content">
                                <p>Hello <strong>${fullName}</strong> (${userName}),</p>
                    
                                <p>We hope you are doing well and using the services efficiently. The subscription of your landing page is about to expire in <strong>${daysLeft} day(s)</strong>. To avoid any interruptions, please renew it before the deadline.</p>
                    
                                <p style="text-align: center;">
                                    <a href="https://wa.me/916207234759?text=Hi%20I%20need%20to%20renew%20my%20landing%20page%20subscription.%20Please%20help%20me%20with%20the%20process.%20Thanks.%0A%0AReference%20USERNAME:%20${userName}" class="button" target="_blank">Renew Now</a>
                                </p>
                    
                                <p>Kindly ignore this message if you have already renewed your subscription.</p>
                    
                                <p>Thank you for choosing <strong>Profile Genie</strong>.</p>
                    
                                <p>Best Regards,<br><strong>Profile Genie Team</strong></p>
                            </div>
                    
                            <div class="footer">
                                Visit us at <a href="https://profilegenie.in" target="_blank">profilegenie.in</a>
                                <div class="social-icons">
                                    <a href="https://www.facebook.com/profilegenie" target="_blank">
                                        <img src="https://cdn-icons-png.flaticon.com/512/733/733547.png" alt="Facebook">
                                    </a>
                                    <a href="https://www.instagram.com/profilegenie" target="_blank">
                                        <img src="https://cdn-icons-png.flaticon.com/512/174/174855.png" alt="Instagram">
                                    </a>
                                    <a href="https://www.linkedin.com/company/profilegenie" target="_blank">
                                        <img src="https://cdn-icons-png.flaticon.com/512/174/174857.png" alt="LinkedIn">
                                    </a>
                                </div>
                                &copy; 2024 Profile Genie. All rights reserved.
                            </div>
                        </div>
                    
                        </body>
                        </html>
                        `

    return { dueMailSubject, dueMailMessage }
}

export const getConfirmPaidMail = (fullName, userName) => {
    const confirmMailSubject = `Reminder: Your Portfolio is renewed`

    const confirmMailMessage = `
                        <html>
                        <head>
                            <style>
                                body {
                                    font-family: Arial, sans-serif;
                                    background-color: #f4f4f4;
                                    margin: 0;
                                    padding: 0;
                                }
                                .container {
                                    max-width: 500px;
                                    margin: 5px auto;
                                    background: #F2F6FC;
                                    padding: 5px;
                                    border-radius: 8px;
                                    box-shadow: 0 4px 10px rgba(0, 0, 0, 0.8);
                                    overflow: hidden;
                                    border: 1px solid #dddddd;
                                }
                                .header {
                                    text-align: center;
                                    background: linear-gradient(90deg, #0052D4, #4364F7, #6FB1FC);
                                    color: #ffffff;
                                    padding: 10px 5px;
                                    font-size: 18px;
                                    font-weight: bold;
                                    border-radius: 8px 8px 0 0;
                                    position: relative;
                                }
                                .header img {
                                    max-width: 60px;
                                    margin-bottom: 7px;
                                }
                                .content {
                                    padding: 5px;
                                    color: #333333;
                                           font-size: 16px;
                                    line-height: 1.4;
                                }
                                .button {
                                    display: inline-block;
                                    background: #0052D4;
                                    color: #ffffff !important;
                                    padding: 12px 20px;
                                    text-decoration: none;
                                    border-radius: 5px;
                                    font-size: 16px;
                                    font-weight: bold;
                                    margin-top: 20px;
                                }
                                .footer {
                                    text-align: center;
                                    font-size: 16px;
                                    color: #666666;
                                    padding: 15px;
                                    border-top: 1px solid #dddddd;
                                    margin-top: 20px;
                                }
                                .social-icons {
                                    text-align: center;
                                    margin-top: 15px;
                                }
                                .social-icons a {
                                    margin: 0 10px;
                                    display: inline-block;
                                }
                                .social-icons img {
                                    width: 30px;
                                    height: 30px;
                                }
                            </style>
                        </head>
                        <body>
                    
                        <div class="container">
                            <div class="header">
                                <img src="https://www.profilegenie.in/assets/QR~Genie%20logo-CnheCMPa.png" alt="Profile Genie Logo">
                                <br>
                                Portfolio Renewed
                            </div>
                            <div class="content">
                                <p>Hello <strong>${fullName}</strong> (${userName}),</p>
                    
                                <p>We hope you are doing well. We are glad to inform you that your subscription of the speed networking tool the 'Landing Page' is renewed now</p>
                    
                                <p>Thank you for choosing <strong>Profile Genie</strong>.</p>
                    
                                <p>Best Regards,<br><strong>Profile Genie Team</strong></p>
                            </div>
                    
                            <div class="footer">
                                Visit us at <a href="https://profilegenie.in" target="_blank">profilegenie.in</a>
                                <div class="social-icons">
                                    <a href="https://www.facebook.com/profilegenie" target="_blank">
                                        <img src="https://cdn-icons-png.flaticon.com/512/733/733547.png" alt="Facebook">
                                    </a>
                                    <a href="https://www.instagram.com/profilegenie" target="_blank">
                                        <img src="https://cdn-icons-png.flaticon.com/512/174/174855.png" alt="Instagram">
                                    </a>
                                    <a href="https://www.linkedin.com/company/profilegenie" target="_blank">
                                        <img src="https://cdn-icons-png.flaticon.com/512/174/174857.png" alt="LinkedIn">
                                    </a>
                                </div>
                                &copy; 2024 Profile Genie. All rights reserved.
                            </div>
                        </div>
                    
                        </body>
                        </html>
                        `

    return { confirmMailSubject, confirmMailMessage }
}

export const getInactiveMail = (fullName, userName) => {
    const subject = `Reminder: Your Portfolio is Inactive`

    const message = `
                        <html>
                        <head>
                            <style>
                                body {
                                    font-family: Arial, sans-serif;
                                    background-color: #f4f4f4;
                                    margin: 0;
                                    padding: 0;
                                }
                                .container {
                                    max-width: 500px;
                                    margin: 5px auto;
                                    background: #F2F6FC;
                                    padding: 5px;
                                    border-radius: 8px;
                                    box-shadow: 0 4px 10px rgba(0, 0, 0, 0.8);
                                    overflow: hidden;
                                    border: 1px solid #dddddd;
                                }
                                .header {
                                    text-align: center;
                                    background: linear-gradient(90deg, #0052D4, #4364F7, #6FB1FC);
                                    color: #ffffff;
                                    padding: 10px 5px;
                                    font-size: 18px;
                                    font-weight: bold;
                                    border-radius: 8px 8px 0 0;
                                    position: relative;
                                }
                                .header img {
                                    max-width: 60px;
                                    margin-bottom: 7px;
                                }
                                .content {
                                    padding: 5px;
                                    color: #333333;
                                           font-size: 16px;
                                    line-height: 1.4;
                                }
                                .button {
                                    display: inline-block;
                                    background: #0052D4;
                                    color: #ffffff !important;
                                    padding: 12px 20px;
                                    text-decoration: none;
                                    border-radius: 5px;
                                    font-size: 16px;
                                    font-weight: bold;
                                    margin-top: 20px;
                                }
                                .footer {
                                    text-align: center;
                                    font-size: 16px;
                                    color: #666666;
                                    padding: 15px;
                                    border-top: 1px solid #dddddd;
                                    margin-top: 20px;
                                }
                                .social-icons {
                                    text-align: center;
                                    margin-top: 15px;
                                }
                                .social-icons a {
                                    margin: 0 10px;
                                    display: inline-block;
                                }
                                .social-icons img {
                                    width: 30px;
                                    height: 30px;
                                }
                            </style>
                        </head>
                        <body>
                    
                        <div class="container">
                            <div class="header">
                                <img src="https://www.profilegenie.in/assets/QR~Genie%20logo-CnheCMPa.png" alt="Profile Genie Logo">
                                <br>
                                Portfolio Inactive
                            </div>
                            <div class="content">
                                <p>Hello <strong>${fullName}</strong> (${userName}),</p>
                    
                                <p>We regret to inform you that your 'Landing Page' has been made inactive due to non-compliance with our terms of service. We understand that this may cause inconvenience and hope you are doing well. Contact us for more information</p>

                                <p style="text-align: center;">
                                    <a href="https://wa.me/916207234759?text=Hi%20I%20have%20received%20a%20notification%20that%20my%20landing%20page%20has%20been%20made%20inactive.%20Please%20help%20me%20with%20the%20process.%20Thanks.%0A%0AReference%20USERNAME:%20${userName}" class="button" target="_blank">Contact Us</a>
                                </p>
                    
                                <p>Thank you for choosing <strong>Profile Genie</strong>.</p>
                    
                                <p>Best Regards,<br><strong>Profile Genie Team</strong></p>
                            </div>
                    
                            <div class="footer">
                                Visit us at <a href="https://profilegenie.in" target="_blank">profilegenie.in</a>
                                <div class="social-icons">
                                    <a href="https://www.facebook.com/profilegenie" target="_blank">
                                        <img src="https://cdn-icons-png.flaticon.com/512/733/733547.png" alt="Facebook">
                                    </a>
                                    <a href="https://www.instagram.com/profilegenie" target="_blank">
                                        <img src="https://cdn-icons-png.flaticon.com/512/174/174855.png" alt="Instagram">
                                    </a>
                                    <a href="https://www.linkedin.com/company/profilegenie" target="_blank">
                                        <img src="https://cdn-icons-png.flaticon.com/512/174/174857.png" alt="LinkedIn">
                                    </a>
                                </div>
                                &copy; 2024 Profile Genie. All rights reserved.
                            </div>
                        </div>
                    
                        </body>
                        </html>
                        `

    return { subject, message }
}

export const getActiveMail = (fullName, userName) => {
    const subject = `Reminder: Your Portfolio is active now`

    const message = `
                        <html>
                        <head>
                            <style>
                                body {
                                    font-family: Arial, sans-serif;
                                    background-color: #f4f4f4;
                                    margin: 0;
                                    padding: 0;
                                }
                                .container {
                                    max-width: 500px;
                                    margin: 5px auto;
                                    background: #F2F6FC;
                                    padding: 5px;
                                    border-radius: 8px;
                                    box-shadow: 0 4px 10px rgba(0, 0, 0, 0.8);
                                    overflow: hidden;
                                    border: 1px solid #dddddd;
                                }
                                .header {
                                    text-align: center;
                                    background: linear-gradient(90deg, #0052D4, #4364F7, #6FB1FC);
                                    color: #ffffff;
                                    padding: 10px 5px;
                                    font-size: 18px;
                                    font-weight: bold;
                                    border-radius: 8px 8px 0 0;
                                    position: relative;
                                }
                                .header img {
                                    max-width: 60px;
                                    margin-bottom: 7px;
                                }
                                .content {
                                    padding: 5px;
                                    color: #333333;
                                           font-size: 16px;
                                    line-height: 1.4;
                                }
                                .button {
                                    display: inline-block;
                                    background: #0052D4;
                                    color: #ffffff !important;
                                    padding: 12px 20px;
                                    text-decoration: none;
                                    border-radius: 5px;
                                    font-size: 16px;
                                    font-weight: bold;
                                    margin-top: 20px;
                                }
                                .footer {
                                    text-align: center;
                                    font-size: 16px;
                                    color: #666666;
                                    padding: 15px;
                                    border-top: 1px solid #dddddd;
                                    margin-top: 20px;
                                }
                                .social-icons {
                                    text-align: center;
                                    margin-top: 15px;
                                }
                                .social-icons a {
                                    margin: 0 10px;
                                    display: inline-block;
                                }
                                .social-icons img {
                                    width: 30px;
                                    height: 30px;
                                }
                            </style>
                        </head>
                        <body>
                    
                        <div class="container">
                            <div class="header">
                                <img src="https://www.profilegenie.in/assets/QR~Genie%20logo-CnheCMPa.png" alt="Profile Genie Logo">
                                <br>
                                Portfolio Activated
                            </div>
                            <div class="content">
                                <p>Hello <strong>${fullName}</strong> (${userName}),</p>
                    
                                <p>We are delighted to inform you that your 'Portfolio' has been activated. We are confident that this feature will provide you with a unique platform to showcase your skills and achievements.</p>

                                <p>Thank you for choosing <strong>Profile Genie</strong>.</p>
                    
                                <p>Best Regards,<br><strong>Profile Genie Team</strong></p>
                            </div>
                    
                            <div class="footer">
                                Visit us at <a href="https://profilegenie.in" target="_blank">profilegenie.in</a>
                                <div class="social-icons">
                                    <a href="https://www.facebook.com/profilegenie" target="_blank">
                                        <img src="https://cdn-icons-png.flaticon.com/512/733/733547.png" alt="Facebook">
                                    </a>
                                    <a href="https://www.instagram.com/profilegenie" target="_blank">
                                        <img src="https://cdn-icons-png.flaticon.com/512/174/174855.png" alt="Instagram">
                                    </a>
                                    <a href="https://www.linkedin.com/company/profilegenie" target="_blank">
                                        <img src="https://cdn-icons-png.flaticon.com/512/174/174857.png" alt="LinkedIn">
                                    </a>
                                </div>
                                &copy; 2024 Profile Genie. All rights reserved.
                            </div>
                        </div>
                    
                        </body>
                        </html>
                        `

    return { subject, message }
}

export const getQuotationMail = (quotation, products, catalogueName, logo) => {
    const subject = `New Quotation Received for Your Catalogue from ${quotation?.fullName}`

    const message = `
                        <html>
                        <head>
                            <style>
                                body {
                                    font-family: Arial, sans-serif;
                                    background-color: #f4f4f4;
                                    margin: 0;
                                    padding: 0;
                                }
                                .container {
                                    max-width: 500px;
                                    margin: 5px auto;
                                    background: #F2F6FC;
                                    padding: 5px;
                                    border-radius: 8px;
                                    box-shadow: 0 4px 10px rgba(0, 0, 0, 0.8);
                                    overflow: hidden;
                                    border: 1px solid #dddddd;
                                }
                                .header {
                                    text-align: center;
                                    background: linear-gradient(90deg, #0052D4, #4364F7, #6FB1FC);
                                    color: #ffffff;
                                    padding: 10px 5px;
                                    font-size: 18px;
                                    font-weight: bold;
                                    border-radius: 8px 8px 0 0;
                                    position: relative;
                                }
                                .header img {
                                    max-width: 50px;
                                   
                                }
                                .content {
                                    padding: 5px;
                                    color: #333333;
                                    font-size: 16px;
                                    line-height: 1.4;
                                }
                                .button {
                                    display: inline-block;
                                    background: #0052D4;
                                    color: #ffffff !important;
                                    padding: 12px 20px;
                                    text-decoration: none;
                                    border-radius: 5px;
                                    font-size: 16px;
                                    font-weight: bold;
                                    margin-top: 20px;
                                }
                                .footer {
                                    text-align: center;
                                    font-size: 16px;
                                    color: #666666;
                                    padding: 15px;
                                    border-top: 1px solid #dddddd;
                                    margin-top: 20px;
                                }
                                .social-icons {
                                    text-align: center;
                                    margin-top: 15px;
                                }
                                .social-icons a {
                                    margin: 0 10px;
                                    display: inline-block;
                                }
                                .social-icons img {
                                    width: 30px;
                                    height: 30px;
                                }
                            </style>
                        </head>
                        <body>
                    
                        <div class="container">
                            <div class="header">
                                <img src="https://www.profilegenie.in/assets/QR~Genie%20logo-CnheCMPa.png" alt="Profile Genie Logo">
                                <img src=${logo} alt="Profile Genie Logo">
                               
                            </div>
                            <div class="content">
                                <p>Hello <strong>${catalogueName}</strong>,</p>
                    
                                <p>You have received a new quotation.</p>
                                <p>User Details</p>
<table style="width: 100%; border-collapse: collapse; border: 1px solid #ddd;">
  <tr>
    <th style="border: 1px solid #ddd; padding: 10px; text-align: left; background-color: #f4f4f4;">Full Name</th>
    <td style="border: 1px solid #ddd; padding: 10px;">${quotation?.fullName}</td>
  </tr>
  <tr>
    <th style="border: 1px solid #ddd; padding: 10px; text-align: left; background-color: #f4f4f4;">Email</th>
    <td style="border: 1px solid #ddd; padding: 10px;">${quotation?.email}</td>
  </tr>
  <tr>
    <th style="border: 1px solid #ddd; padding: 10px; text-align: left; background-color: #f4f4f4;">Phone Number</th>
    <td style="border: 1px solid #ddd; padding: 10px;">+${quotation?.phone}</td>
  </tr>
  <tr>
    <th style="border: 1px solid #ddd; padding: 10px; text-align: left; background-color: #f4f4f4;">Message</th>
    <td style="border: 1px solid #ddd; padding: 10px;">${quotation?.message}</td>
  </tr>
</table>

 <p>Product Details</p>

<table role="presentation" width="100%" cellspacing="0" cellpadding="0">
   
    <tr>
      <td colspan="2" style="padding-top: 10px; text-align: center;">
        <div style="display: grid; grid-template-columns: repeat(2, 1fr); gap: 20px; padding: 10px;">
          ${products?.map(item => `
            <div style="border: 1px solid #ddd; padding: 10px;">
  <table role="presentation" width="100%" cellspacing="0" cellpadding="0">
    <!-- Item Name -->
    <tr>
      <td colspan="2" style="font-size: 16px; font-weight: bold; text-align: center; padding-bottom: 10px;">
        ${item?.name}
      </td>
    </tr>
    <tr>
      <!-- Image on the Left -->
      <td style="width: 100px; padding-right: 10px;">
        <img src="${item?.image[0]?.url}" alt="${item?.name}" 
             style="width: 90%; height: auto; object-fit: cover; max-width: 150px; border-radius: 5px;" />
      </td>
      <!-- Details on the Right -->
      <td style="font-size: 14px; line-height: 1; vertical-align: top; text-align: left;">
        <p><strong>Item Code:</strong> ${item?.HSNCode}</p>
        <p><strong>Quantity:</strong> ${item?.quantity}</p>
        <p><strong>Price:</strong> ${item?.price}</p>
      </td>
    </tr>
  </table>
</div>

          `).join('')}
        </div>
      </td>
    </tr>
  </table>

                                <p>Thank you for choosing <strong>Profile Genie</strong>.</p>
                    
                                <p>Best Regards,<br><strong>Profile Genie Team</strong></p>
                            </div>
                    
                            <div class="footer">
                                Visit us at <a href="https://profilegenie.in" target="_blank">profilegenie.in</a>
                                <div class="social-icons">
                                    <a href="https://www.facebook.com/profilegenie" target="_blank">
                                        <img src="https://cdn-icons-png.flaticon.com/512/733/733547.png" alt="Facebook">
                                    </a>
                                    <a href="https://www.instagram.com/profilegenie" target="_blank">
                                        <img src="https://cdn-icons-png.flaticon.com/512/174/174855.png" alt="Instagram">
                                    </a>
                                    <a href="https://www.linkedin.com/company/profilegenie" target="_blank">
                                        <img src="https://cdn-icons-png.flaticon.com/512/174/174857.png" alt="LinkedIn">
                                    </a>
                                </div>
                                &copy; 2024 Profile Genie. All rights reserved.
                            </div>
                        </div>
                    
                        </body>
                        </html>
                        `

    return { subject, message }
}

export const sendQuotationRes = (quotation, products, catalogueName, logo) => {
    const subject = `Quotation Received: Our Team Will Contact You Soon`;

    const message = `
                        <html>
                        <head>
                            <style>
                                body {
                                    font-family: Arial, sans-serif;
                                    background-color: #f4f4f4;
                                    margin: 0;
                                    padding: 0;
                                }
                                .container {
                                    max-width: 500px;
                                    margin: 5px auto;
                                    background: #F2F6FC;
                                    padding: 5px;
                                    border-radius: 8px;
                                    box-shadow: 0 4px 10px rgba(0, 0, 0, 0.8);
                                    overflow: hidden;
                                    border: 1px solid #dddddd;
                                }
                                .header {
                                    text-align: center;
                                    background: linear-gradient(90deg, #0052D4, #4364F7, #6FB1FC);
                                    color: #ffffff;
                                    padding: 10px 5px;
                                    font-size: 18px;
                                    font-weight: bold;
                                    border-radius: 8px 8px 0 0;
                                    position: relative;
                                }
                                .header img {
                                    max-width: 60px;
                                    margin-bottom: 7px;
                                }
                                .content {
                                    padding: 5px;
                                    color: #333333;
                                           font-size: 16px;
                                    line-height: 1.4;
                                }
                                .button {
                                    display: inline-block;
                                    background: #0052D4;
                                    color: #ffffff !important;
                                    padding: 12px 20px;
                                    text-decoration: none;
                                    border-radius: 5px;
                                    font-size: 16px;
                                    font-weight: bold;
                                    margin-top: 20px;
                                }
                                .footer {
                                    text-align: center;
                                    font-size: 16px;
                                    color: #666666;
                                    padding: 15px;
                                    border-top: 1px solid #dddddd;
                                    margin-top: 20px;
                                }
                                .social-icons {
                                    text-align: center;
                                    margin-top: 15px;
                                }
                                .social-icons a {
                                    margin: 0 10px;
                                    display: inline-block;
                                }
                                .social-icons img {
                                    width: 30px;
                                    height: 30px;
                                }
                            </style>
                        </head>
                        <body>
                    
                        <div class="container">
                            <div class="header">
                                <img src="https://www.profilegenie.in/assets/QR~Genie%20logo-CnheCMPa.png" alt="Profile Genie Logo">
                                <br>
                                Portfolio Activated
                            </div>
                           <div class="content">
    <p>Hello <strong>${quotation?.fullName}</strong></p>

    <p>We have received your quotation request and appreciate your interest. Our team will review your request and get in touch with you shortly.</p>

 <p>Product Details</p>

<table role="presentation" width="100%" cellspacing="0" cellpadding="0">
   
    <tr>
      <td colspan="2" style="padding-top: 10px; text-align: center;">
        <div style="display: grid; grid-template-columns: repeat(2, 1fr); gap: 20px; padding: 10px;">
          ${products?.map(item => `
            <div style="border: 1px solid #ddd; padding: 10px;">
  <table role="presentation" width="100%" cellspacing="0" cellpadding="0">
    <!-- Item Name -->
    <tr>
      <td colspan="2" style="font-size: 16px; font-weight: bold; text-align: center; padding-bottom: 10px;">
        ${item?.name}
      </td>
    </tr>
    <tr>
      <!-- Image on the Left -->
      <td style="width: 100px; padding-right: 10px;">
        <img src="${item?.image[0]?.url}" alt="${item?.name}" 
             style="width: 90%; height: auto; object-fit: cover; max-width: 150px; border-radius: 5px;" />
      </td>
      <!-- Details on the Right -->
      <td style="font-size: 14px; line-height: 1; vertical-align: top; text-align: left;">
        <p><strong>Item Code:</strong> ${item?.HSNCode}</p>
        <p><strong>Quantity:</strong> ${item?.quantity}</p>
        <p><strong>Price:</strong> ${item?.price}</p>
      </td>
    </tr>
  </table>
</div>

          `).join('')}
        </div>
      </td>
    </tr>
  </table>

    <p>Thank you for choosing <strong>${catalogueName}</strong>.</p>

    <p>Best Regards,<br><strong>Profile Genie Team</strong></p>
</div>
                    
                            <div class="footer">
                                Visit us at <a href="https://profilegenie.in" target="_blank">profilegenie.in</a>
                                <div class="social-icons">
                                    <a href="https://www.facebook.com/profilegenie" target="_blank">
                                        <img src="https://cdn-icons-png.flaticon.com/512/733/733547.png" alt="Facebook">
                                    </a>
                                    <a href="https://www.instagram.com/profilegenie" target="_blank">
                                        <img src="https://cdn-icons-png.flaticon.com/512/174/174855.png" alt="Instagram">
                                    </a>
                                    <a href="https://www.linkedin.com/company/profilegenie" target="_blank">
                                        <img src="https://cdn-icons-png.flaticon.com/512/174/174857.png" alt="LinkedIn">
                                    </a>
                                </div>
                                &copy; 2024 Profile Genie. All rights reserved.
                            </div>
                        </div>
                    
                        </body>
                        </html>
                        `

    return { subject, message }
}

export const getCatalogueDueMail = (daysLeft, fullName, userName, catalogueName) => {
    const dueMailSubject = `Reminder: Your Catalogue Payment is Due in ${daysLeft} Day(s)`

    const dueMailMessage = `
                        <html>
                        <head>
                            <style>
                                body {
                                    font-family: Arial, sans-serif;
                                    background-color: #f4f4f4;
                                    margin: 0;
                                    padding: 0;
                                }
                                .container {
                                    max-width: 500px;
                                    margin: 5px auto;
                                    background: #F2F6FC;
                                    padding: 5px;
                                    border-radius: 8px;
                                    box-shadow: 0 4px 10px rgba(0, 0, 0, 0.8);
                                    overflow: hidden;
                                    border: 1px solid #dddddd;
                                }
                                .header {
                                    text-align: center;
                                    background: linear-gradient(90deg, #0052D4, #4364F7, #6FB1FC);
                                    color: #ffffff;
                                    padding: 10px 5px;
                                    font-size: 18px;
                                    font-weight: bold;
                                    border-radius: 8px 8px 0 0;
                                    position: relative;
                                }
                                .header img {
                                    max-width: 60px;
                                    margin-bottom: 7px;
                                }
                                .content {
                                    padding: 5px;
                                    color: #333333;
                                           font-size: 16px;
                                    line-height: 1.4;
                                }
                                .button {
                                    display: inline-block;
                                    background: #0052D4;
                                    color: #ffffff !important;
                                    padding: 12px 20px;
                                    text-decoration: none;
                                    border-radius: 5px;
                                    font-size: 16px;
                                    font-weight: bold;
                                    margin-top: 20px;
                                }
                                .footer {
                                    text-align: center;
                                    font-size: 16px;
                                    color: #666666;
                                    padding: 15px;
                                    border-top: 1px solid #dddddd;
                                    margin-top: 20px;
                                }
                                .social-icons {
                                    text-align: center;
                                    margin-top: 15px;
                                }
                                .social-icons a {
                                    margin: 0 10px;
                                    display: inline-block;
                                }
                                .social-icons img {
                                    width: 30px;
                                    height: 30px;
                                }
                            </style>
                        </head>
                        <body>
                    
                        <div class="container">
                            <div class="header">
                                <img src="https://www.profilegenie.in/assets/QR~Genie%20logo-CnheCMPa.png" alt="Profile Genie Logo">
                                <br>
                                Catalogue Payment Expiry Notice
                            </div>
                            <div class="content">
                                <p>Hello <strong>${fullName}</strong> (${userName}),</p>
                    
                                <p>We hope you are doing well and using the services efficiently. The subscription of your <strong>${catalogueName}</strong> Catalogue page is about to expire in <strong>${daysLeft} day(s)</strong>. To avoid any interruptions, please renew it before the deadline.</p>
                    
                                <p style="text-align: center;">
                                    <a href="https://wa.me/916207234759?text=Hi%20I%20need%20to%20renew%20my%20landing%20page%20subscription.%20Please%20help%20me%20with%20the%20process.%20Thanks.%0A%0AReference%20USERNAME:%20${userName}" class="button" target="_blank">Renew Now</a>
                                </p>
                    
                                <p>Kindly ignore this message if you have already renewed your subscription.</p>
                    
                                <p>Thank you for choosing <strong>Profile Genie</strong>.</p>
                    
                                <p>Best Regards,<br><strong>Profile Genie Team</strong></p>
                            </div>
                    
                            <div class="footer">
                                Visit us at <a href="https://profilegenie.in" target="_blank">profilegenie.in</a>
                                <div class="social-icons">
                                    <a href="https://www.facebook.com/profilegenie" target="_blank">
                                        <img src="https://cdn-icons-png.flaticon.com/512/733/733547.png" alt="Facebook">
                                    </a>
                                    <a href="https://www.instagram.com/profilegenie" target="_blank">
                                        <img src="https://cdn-icons-png.flaticon.com/512/174/174855.png" alt="Instagram">
                                    </a>
                                    <a href="https://www.linkedin.com/company/profilegenie" target="_blank">
                                        <img src="https://cdn-icons-png.flaticon.com/512/174/174857.png" alt="LinkedIn">
                                    </a>
                                </div>
                                &copy; 2024 Profile Genie. All rights reserved.
                            </div>
                        </div>
                    
                        </body>
                        </html>
                        `

    return { dueMailSubject, dueMailMessage }
}

export const getCataloguePaidMail = (fullName, userName, catalogueName) => {
    const confirmMailSubject = `Reminder: Your Catalogue is renewed`

    const confirmMailMessage = `
                        <html>
                        <head>
                            <style>
                                body {
                                    font-family: Arial, sans-serif;
                                    background-color: #f4f4f4;
                                    margin: 0;
                                    padding: 0;
                                }
                                .container {
                                    max-width: 500px;
                                    margin: 5px auto;
                                    background: #F2F6FC;
                                    padding: 5px;
                                    border-radius: 8px;
                                    box-shadow: 0 4px 10px rgba(0, 0, 0, 0.8);
                                    overflow: hidden;
                                    border: 1px solid #dddddd;
                                }
                                .header {
                                    text-align: center;
                                    background: linear-gradient(90deg, #0052D4, #4364F7, #6FB1FC);
                                    color: #ffffff;
                                    padding: 10px 5px;
                                    font-size: 18px;
                                    font-weight: bold;
                                    border-radius: 8px 8px 0 0;
                                    position: relative;
                                }
                                .header img {
                                    max-width: 60px;
                                    margin-bottom: 7px;
                                }
                                .content {
                                    padding: 5px;
                                    color: #333333;
                                           font-size: 16px;
                                    line-height: 1.4;
                                }
                                .button {
                                    display: inline-block;
                                    background: #0052D4;
                                    color: #ffffff !important;
                                    padding: 12px 20px;
                                    text-decoration: none;
                                    border-radius: 5px;
                                    font-size: 16px;
                                    font-weight: bold;
                                    margin-top: 20px;
                                }
                                .footer {
                                    text-align: center;
                                    font-size: 16px;
                                    color: #666666;
                                    padding: 15px;
                                    border-top: 1px solid #dddddd;
                                    margin-top: 20px;
                                }
                                .social-icons {
                                    text-align: center;
                                    margin-top: 15px;
                                }
                                .social-icons a {
                                    margin: 0 10px;
                                    display: inline-block;
                                }
                                .social-icons img {
                                    width: 30px;
                                    height: 30px;
                                }
                            </style>
                        </head>
                        <body>
                    
                        <div class="container">
                            <div class="header">
                                <img src="https://www.profilegenie.in/assets/QR~Genie%20logo-CnheCMPa.png" alt="Profile Genie Logo">
                                <br>
                                Catalogue Renewed
                            </div>
                            <div class="content">
                                <p>Hello <strong>${fullName}</strong> (${userName}),</p>
                    
                                <p>We hope you are doing well. We are glad to inform you that your subscription of the speed networking tool the <strong>${catalogueName}</strong> is renewed now</p>
                    
                                <p>Thank you for choosing <strong>Profile Genie</strong>.</p>
                    
                                <p>Best Regards,<br><strong>Profile Genie Team</strong></p>
                            </div>
                    
                            <div class="footer">
                                Visit us at <a href="https://profilegenie.in" target="_blank">profilegenie.in</a>
                                <div class="social-icons">
                                    <a href="https://www.facebook.com/profilegenie" target="_blank">
                                        <img src="https://cdn-icons-png.flaticon.com/512/733/733547.png" alt="Facebook">
                                    </a>
                                    <a href="https://www.instagram.com/profilegenie" target="_blank">
                                        <img src="https://cdn-icons-png.flaticon.com/512/174/174855.png" alt="Instagram">
                                    </a>
                                    <a href="https://www.linkedin.com/company/profilegenie" target="_blank">
                                        <img src="https://cdn-icons-png.flaticon.com/512/174/174857.png" alt="LinkedIn">
                                    </a>
                                </div>
                                &copy; 2024 Profile Genie. All rights reserved.
                            </div>
                        </div>
                    
                        </body>
                        </html>
                        `

    return { confirmMailSubject, confirmMailMessage }
}

export const getCatalogueInactiveMail = (fullName, userName, catalogueName) => {
    const subject = `Reminder: Your Catalogue is Inactive`

    const message = `
                        <html>
                        <head>
                            <style>
                                body {
                                    font-family: Arial, sans-serif;
                                    background-color: #f4f4f4;
                                    margin: 0;
                                    padding: 0;
                                }
                                .container {
                                    max-width: 500px;
                                    margin: 5px auto;
                                    background: #F2F6FC;
                                    padding: 5px;
                                    border-radius: 8px;
                                    box-shadow: 0 4px 10px rgba(0, 0, 0, 0.8);
                                    overflow: hidden;
                                    border: 1px solid #dddddd;
                                }
                                .header {
                                    text-align: center;
                                    background: linear-gradient(90deg, #0052D4, #4364F7, #6FB1FC);
                                    color: #ffffff;
                                    padding: 10px 5px;
                                    font-size: 18px;
                                    font-weight: bold;
                                    border-radius: 8px 8px 0 0;
                                    position: relative;
                                }
                                .header img {
                                    max-width: 60px;
                                    margin-bottom: 7px;
                                }
                                .content {
                                    padding: 5px;
                                    color: #333333;
                                           font-size: 16px;
                                    line-height: 1.4;
                                }
                                .button {
                                    display: inline-block;
                                    background: #0052D4;
                                    color: #ffffff !important;
                                    padding: 12px 20px;
                                    text-decoration: none;
                                    border-radius: 5px;
                                    font-size: 16px;
                                    font-weight: bold;
                                    margin-top: 20px;
                                }
                                .footer {
                                    text-align: center;
                                    font-size: 16px;
                                    color: #666666;
                                    padding: 15px;
                                    border-top: 1px solid #dddddd;
                                    margin-top: 20px;
                                }
                                .social-icons {
                                    text-align: center;
                                    margin-top: 15px;
                                }
                                .social-icons a {
                                    margin: 0 10px;
                                    display: inline-block;
                                }
                                .social-icons img {
                                    width: 30px;
                                    height: 30px;
                                }
                            </style>
                        </head>
                        <body>
                    
                        <div class="container">
                            <div class="header">
                                <img src="https://www.profilegenie.in/assets/QR~Genie%20logo-CnheCMPa.png" alt="Profile Genie Logo">
                                <br>
                                Catalogue Inactive
                            </div>
                            <div class="content">
                                <p>Hello <strong>${fullName}</strong> (${userName}),</p>
                    
                                <p>We regret to inform you that your <strong>${catalogueName}</strong> has been made inactive due to non-compliance with our terms of service. We understand that this may cause inconvenience and hope you are doing well. Contact us for more information</p>

                                <p style="text-align: center;">
                                    <a href="https://wa.me/916207234759?text=Hi%20I%20have%20received%20a%20notification%20that%20my%20landing%20page%20has%20been%20made%20inactive.%20Please%20help%20me%20with%20the%20process.%20Thanks.%0A%0AReference%20USERNAME:%20${userName}" class="button" target="_blank">Contact Us</a>
                                </p>
                    
                                <p>Thank you for choosing <strong>Profile Genie</strong>.</p>
                    
                                <p>Best Regards,<br><strong>Profile Genie Team</strong></p>
                            </div>
                    
                            <div class="footer">
                                Visit us at <a href="https://profilegenie.in" target="_blank">profilegenie.in</a>
                                <div class="social-icons">
                                    <a href="https://www.facebook.com/profilegenie" target="_blank">
                                        <img src="https://cdn-icons-png.flaticon.com/512/733/733547.png" alt="Facebook">
                                    </a>
                                    <a href="https://www.instagram.com/profilegenie" target="_blank">
                                        <img src="https://cdn-icons-png.flaticon.com/512/174/174855.png" alt="Instagram">
                                    </a>
                                    <a href="https://www.linkedin.com/company/profilegenie" target="_blank">
                                        <img src="https://cdn-icons-png.flaticon.com/512/174/174857.png" alt="LinkedIn">
                                    </a>
                                </div>
                                &copy; 2024 Profile Genie. All rights reserved.
                            </div>
                        </div>
                    
                        </body>
                        </html>
                        `

    return { subject, message }
}

export const getCatalogueActiveMail = (fullName, userName, catalogueName) => {
    const subject = `Reminder: Your Catalogue is active now`

    const message = `
                        <html>
                        <head>
                            <style>
                                body {
                                    font-family: Arial, sans-serif;
                                    background-color: #f4f4f4;
                                    margin: 0;
                                    padding: 0;
                                }
                                .container {
                                    max-width: 500px;
                                    margin: 5px auto;
                                    background: #F2F6FC;
                                    padding: 5px;
                                    border-radius: 8px;
                                    box-shadow: 0 4px 10px rgba(0, 0, 0, 0.8);
                                    overflow: hidden;
                                    border: 1px solid #dddddd;
                                }
                                .header {
                                    text-align: center;
                                    background: linear-gradient(90deg, #0052D4, #4364F7, #6FB1FC);
                                    color: #ffffff;
                                    padding: 10px 5px;
                                    font-size: 18px;
                                    font-weight: bold;
                                    border-radius: 8px 8px 0 0;
                                    position: relative;
                                }
                                .header img {
                                    max-width: 60px;
                                    margin-bottom: 7px;
                                }
                                .content {
                                    padding: 5px;
                                    color: #333333;
                                           font-size: 16px;
                                    line-height: 1.4;
                                }
                                .button {
                                    display: inline-block;
                                    background: #0052D4;
                                    color: #ffffff !important;
                                    padding: 12px 20px;
                                    text-decoration: none;
                                    border-radius: 5px;
                                    font-size: 16px;
                                    font-weight: bold;
                                    margin-top: 20px;
                                }
                                .footer {
                                    text-align: center;
                                    font-size: 16px;
                                    color: #666666;
                                    padding: 15px;
                                    border-top: 1px solid #dddddd;
                                    margin-top: 20px;
                                }
                                .social-icons {
                                    text-align: center;
                                    margin-top: 15px;
                                }
                                .social-icons a {
                                    margin: 0 10px;
                                    display: inline-block;
                                }
                                .social-icons img {
                                    width: 30px;
                                    height: 30px;
                                }
                            </style>
                        </head>
                        <body>
                    
                        <div class="container">
                            <div class="header">
                                <img src="https://www.profilegenie.in/assets/QR~Genie%20logo-CnheCMPa.png" alt="Profile Genie Logo">
                                <br>
                                Catalogue Activated
                            </div>
                            <div class="content">
                                <p>Hello <strong>${fullName}</strong> (${userName}),</p>
                    
                                <p>We are delighted to inform you that your <strong>${catalogueName}</strong> has been activated. We are confident that this feature will provide you with a unique platform to showcase your skills and achievements.</p>

                                <p>Thank you for choosing <strong>Profile Genie</strong>.</p>
                    
                                <p>Best Regards,<br><strong>Profile Genie Team</strong></p>
                            </div>
                    
                            <div class="footer">
                                Visit us at <a href="https://profilegenie.in" target="_blank">profilegenie.in</a>
                                <div class="social-icons">
                                    <a href="https://www.facebook.com/profilegenie" target="_blank">
                                        <img src="https://cdn-icons-png.flaticon.com/512/733/733547.png" alt="Facebook">
                                    </a>
                                    <a href="https://www.instagram.com/profilegenie" target="_blank">
                                        <img src="https://cdn-icons-png.flaticon.com/512/174/174855.png" alt="Instagram">
                                    </a>
                                    <a href="https://www.linkedin.com/company/profilegenie" target="_blank">
                                        <img src="https://cdn-icons-png.flaticon.com/512/174/174857.png" alt="LinkedIn">
                                    </a>
                                </div>
                                &copy; 2024 Profile Genie. All rights reserved.
                            </div>
                        </div>
                    
                        </body>
                        </html>
                        `

    return { subject, message }
}