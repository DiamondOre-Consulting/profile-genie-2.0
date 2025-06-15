import cron from "node-cron";
import Portfolio from "../model/portfolioModel/portfolio.model.js";
import sendMail from "../utils/mail.utils.js";
import { getCatalogueDueMail, getDueMail } from "../utils/cronMessages.js";
import Catalogue from "../model/catalogueModel/catalogue.model.js";

export const portfolioCrone = () => {
  cron.schedule("12 18 * * *", async () => {
    try {
      const oneYearAgo = new Date();
      oneYearAgo.setFullYear(oneYearAgo.getFullYear() - 1);

      const result = await Portfolio.updateMany(
        { paidDate: { $lt: oneYearAgo }, isPaid: true },
        { $set: { isPaid: false } }
      );
    } catch (error) {
      return;
    }
  });

  cron.schedule("12 18 * * *", async () => {
    try {
      const today = new Date();

      const portfolios = await Portfolio.find({
        isPaid: true,
      });

      for (const portfolio of portfolios) {
        const paidDate = new Date(portfolio.paidDate);
        const expiryDate = new Date(paidDate);
        expiryDate.setFullYear(paidDate.getFullYear() + 1);

        const daysLeft = Math.ceil(
          (expiryDate - today) / (1000 * 60 * 60 * 24)
        );

        if ([10, 5, 3, 2, 1, 0].includes(daysLeft)) {
          const { dueMailSubject, dueMailMessage } = getDueMail(
            daysLeft,
            portfolio?.fullName,
            portfolio?.userName
          );

          await sendMail(portfolio.email, dueMailSubject, dueMailMessage);
        }
      }
    } catch (error) {
      return;
    }
  });
};

export const catalogueCrone = () => {
  // cron.schedule("* * * * *", async () => {
  //     try {
  //         console.log("Cron job triggered every minute");
  //     } catch (error) {
  //         console.error("❌ Error in cron job:", error);
  //     }
  // });

  cron.schedule("12 18 * * *", async () => {
    try {
      const oneYearAgo = new Date();
      oneYearAgo.setFullYear(oneYearAgo.getFullYear() - 1);

      const result = await Catalogue.updateMany(
        { paidDate: { $lt: oneYearAgo }, isPaid: true },
        { $set: { isPaid: false } }
      );

      await result.save();
    } catch (error) {
      return;
    }
  });

  cron.schedule("12 18 * * *", async () => {
    try {
      const today = new Date();

      const portfolios = await Catalogue.find({
        isPaid: true,
      }).populate({
        path: "catalogueOwner",
        populate: {
          path: "authAccount",
        },
      });

      for (const portfolio of portfolios) {
        const paidDate = new Date(portfolio.paidDate);
        const expiryDate = new Date(paidDate);
        expiryDate.setFullYear(paidDate.getFullYear() + 1);

        const daysLeft = Math.ceil(
          (expiryDate - today) / (1000 * 60 * 60 * 24)
        );

        if ([10, 5, 3, 2, 1, 0].includes(daysLeft)) {
          const { dueMailSubject, dueMailMessage } = getCatalogueDueMail(
            daysLeft,
            portfolio?.catalogueOwner?.authAccount?.fullName,
            portfolio?.userName,
            portfolio?.name
          );

          await sendMail(
            portfolio?.catalogueOwner?.authAccount?.email,
            dueMailSubject,
            dueMailMessage
          );
        } else if (daysLeft <= 0) {
          const { dueMailSubject, dueMailMessage } = getCatalogueDueMail(
            daysLeft,
            portfolio?.catalogueOwner?.authAccount?.fullName,
            portfolio?.userName,
            portfolio?.name
          );

          await sendMail(
            portfolio?.catalogueOwner?.authAccount?.email,
            dueMailSubject,
            dueMailMessage
          );
        }
      }
    } catch (error) {
      return;
    }
  });
};
