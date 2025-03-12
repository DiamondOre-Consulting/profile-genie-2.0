import cron from "node-cron";
import Portfolio from "../model/portfolioModel/portfolio.model.js";
import sendMail from "../utils/mail.utils.js";
import { getDueMail } from "../utils/cronMessages.js";


export const portfolioCrone = () => {
    cron.schedule("* * * * *", async () => {
        try {
            console.log("Cron job triggered every minute");
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

                    const { dueMailSubject, dueMailMessage } = getDueMail(daysLeft, portfolio?.fullName, portfolio?.userName)

                    await sendMail(
                        portfolio.email,
                        dueMailSubject,
                        dueMailMessage
                    );
                }
            }

            console.log(`✅ Reminder emails sent for portfolios expiring soon.`);
        } catch (error) {
            console.error("❌ Error in reminder cron job:", error);
        }
    });

}
