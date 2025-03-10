import cron from "node-cron";
import Portfolio from "../model/portfolioModel/portfolio.model.js";
import sendMail from "../utils/mail.utils.js";


export const portfolioCrone = () => {
    cron.schedule("* * * * *", async () => {
        try {
            console.log("Cron job triggered every minute");

            // Your logic here
        } catch (error) {
            console.error("❌ Error in cron job:", error);
        }
    });


    cron.schedule("12 18 * * *", async () => {
        try {
            const oneYearAgo = new Date();
            oneYearAgo.setFullYear(oneYearAgo.getFullYear() - 1);

            const result = await Portfolio.updateMany(
                { paidDate: { $lt: oneYearAgo }, isPaid: true },
                { $set: { isPaid: false } }
            );

            console.log(`✅ Updated ${result.modifiedCount} records: isPaid set to false`);
        } catch (error) {
            console.error("❌ Error in isPaid cron job:", error);
        }
    });

    cron.schedule("* * * * *", async () => {
        try {
            console.log("object")
            const today = new Date();

            const portfolios = await Portfolio.find({
                isPaid: true,
            });

            for (const portfolio of portfolios) {
                const paidDate = new Date(portfolio.paidDate);
                const expiryDate = new Date(paidDate);
                expiryDate.setFullYear(paidDate.getFullYear() + 1);

                const daysLeft = Math.ceil((expiryDate - today) / (1000 * 60 * 60 * 24));

                if ([10, 5, 3, 2, 1, 0].includes(daysLeft)) {
                    await sendMail(
                        portfolio.email,
                        `Reminder: Your Portfolio Payment is Due in ${daysLeft} Day(s)`,
                        `
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
                                    max-width: 700px;
                                    margin: 5px auto;
                                    background: #ffffff;
                                    padding: 5px;
                                    border-radius: 8px;
                                    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
                                    overflow: hidden;
                                }
                                .header {
                                    text-align: center;
                                    background: linear-gradient(90deg, #0052D4, #4364F7, #6FB1FC);
                                    color: #ffffff;
                                    padding: 10px 5px;
                                    font-size: 16px;
                                    font-weight: bold;
                                    border-radius: 8px 8px 0 0;
                                    position: relative;
                                }
                                .header img {
                                    max-width: 60px;
                                    margin-bottom: 8px;
                                }
                                .content {
                                    padding: 5px;
                                    color: #333333;
                                    line-height: 1.3;
                                }
                                .button {
                                    display: inline-block;
                                    background: #0052D4;
                                    color: #ffffff;
                                    padding: 12px 20px;
                                    text-decoration: none;
                                    border-radius: 5px;
                                    font-size: 16px;
                                    font-weight: bold;
                                    margin-top: 20px;
                                }
                                .footer {
                                    text-align: center;
                                    font-size: 14px;
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
                                <img src="https://th.bing.com/th?id=OIP.1d7TQI67pwfr0F5jqTgD1AHaGw&w=261&h=238&c=8&rs=1&qlt=90&o=6&dpr=1.3&pid=3.1&rm=2" alt="Profile Geniw Logo">
                                <br>
                                Portfolio Payment Expiry Notice
                            </div>
                            <div class="content">
                                <p>Dear <strong>${portfolio.fullName}</strong> (${portfolio.username}),</p>
                    
                                <p>Your portfolio payment is set to expire in <strong>${daysLeft} day(s)</strong>. To avoid any interruptions, please renew it before the deadline.</p>
                    
                                <p style="text-align: center;">
                                    <a href="${portfolio.renewalLink}" class="button">Renew Now</a>
                                </p>
                    
                                <p>If you have already renewed, please disregard this message.</p>
                    
                                <p>Thank you for choosing <strong>Profile Geniw</strong>.</p>
                    
                                <p>Best Regards,<br><strong>Profile Geniw Team</strong></p>
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
                                &copy; 2024 Profile Geniw. All rights reserved.
                            </div>
                        </div>
                    
                        </body>
                        </html>
                        `
                    );



                }
            }

            console.log(`✅ Reminder emails sent for portfolios expiring soon.`);
        } catch (error) {
            console.error("❌ Error in reminder cron job:", error);
        }
    });

}
