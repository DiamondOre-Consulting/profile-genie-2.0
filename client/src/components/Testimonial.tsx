import { motion } from "motion/react";
import { TestimonialsColumn } from "./testimonials-columns-1";

const testimonials = [
  {
    text: "Earlier, I relied on business cards—now I capture contact details instantly using QR stickers by Profile~Genie. It’s quicker, smarter, and gives me the edge in networking.",
    image: "https://randomuser.me/api/portraits/men/1.jpg",
    name: "Vikas Sharma",
    role: "Business Professional",
  },
  {
    text: "This tool flipped my networking game. I’ve closed more deals just by being the first to follow up. People save my contact the way I want—no mistakes!",
    image: "https://randomuser.me/api/portraits/men/10.jpg",
    name: "Nirjulesh Mehta",
    role: "Entrepreneur",
  },
  {
    text: "I stopped carrying visiting cards. A QR sticker on my phone gets me contact details instantly and keeps my networking sharp.",
    image: "https://randomuser.me/api/portraits/men/11.jpg",
    name: "Pankaj Bansal",
    role: "Business Consultant",
  },
  {
    text: "Meeting strangers used to mean exchanging cards. Now I get their contact immediately. Networking feels proactive and rewarding.",
    image: "https://randomuser.me/api/portraits/men/12.jpg",
    name: "Dhiraj Sinha",
    role: "Networking Expert",
  },
  {
    text: "Simple, sleek, and super useful. I collect contacts while others fumble for cards. A must-have for serious business owners.",
    image: "https://randomuser.me/api/portraits/men/13.jpg",
    name: "Ambey Joshi",
    role: "Entrepreneur",
  },
  {
    text: "As an attire exporter, events used to be chaotic. With Profile~Genie, I save more contacts and follow up directly—boosting conversions.",
    image: "https://randomuser.me/api/portraits/women/15.jpg",
    name: "Priya Malhotra",
    role: "Attire Exporter",
  },
  {
    text: "Now I never lose a potential connection. This e-card gives me every visitor’s details instantly. Smart networking at its best.",
    image: "https://randomuser.me/api/portraits/men/16.jpg",
    name: "Anil Sharma",
    role: "Petrol Pump Owner",
  },
  {
    text: "One scan, one click—and I have their contact. It ensures I’m always ahead in follow-ups.",
    image: "https://randomuser.me/api/portraits/men/17.jpg",
    name: "Rajesh Patel",
    role: "Business Owner",
  },
  {
    text: "No more hoping someone calls back. I have their number instantly. It makes me feel professional and organized.",
    image: "https://randomuser.me/api/portraits/men/18.jpg",
    name: "Amit Verma",
    role: "Sales Executive",
  },
  {
    text: "I used to leave events with a pile of cards. Now, I leave with real leads, thanks to Profile~Genie. It’s changed my networking.",
    image: "https://randomuser.me/api/portraits/women/19.jpg",
    name: "Nitya Arora",
    role: "Motivational Speaker",
  },
  {
    text: "As a doctor and speaker, networking is key. This kit helps me connect with attendees without juggling cards or notes.",
    image: "https://randomuser.me/api/portraits/women/20.jpg",
    name: "Dr. Surbhi Bedi",
    role: "Doctor & Speaker",
  },
  {
    text: "Profile~Genie changed my approach. I collect contacts on the spot and follow up faster. Network expansions were not easy before.",
    image: "https://randomuser.me/api/portraits/men/21.jpg",
    name: "Gaurav Khurana",
    role: "HVAC Specialist",
  },
  {
    text: "Quick follow-ups matter. This tool gives me visitor details instantly, giving me the first-mover advantage.",
    image: "https://randomuser.me/api/portraits/men/22.jpg",
    name: "Vishal Bhargava",
    role: "Corrugated Box Supplier",
  },
  {
    text: "Profile~Genie works like magic. I stopped carrying cards, and now I get contacts instantly—follow-ups are sharper.",
    image: "https://randomuser.me/api/portraits/men/23.jpg",
    name: "Amit Desai",
    role: "Marketer",
  },
  {
    text: "I get contacts instantly with a scan. It helped grow my business significantly. People see me as the 'Smart Man.'",
    image: "https://randomuser.me/api/portraits/men/24.jpg",
    name: "Ashu Saxena",
    role: "Retailer",
  },
  {
    text: "Clean, quick, and professional. With Profile~Genie stickers, I share my details in seconds. It’s like having a smart assistant.",
    image: "https://randomuser.me/api/portraits/women/25.jpg",
    name: "Monikca Sethi",
    role: "Sales Expert",
  },
  {
    text: "I’ve built more real connections using the QR Pop-up Sticker and keychain. It’s a no-brainer for events.",
    image: "https://randomuser.me/api/portraits/men/26.jpg",
    name: "Utkarsh Menon",
    role: "Startup Founder",
  },
  {
    text: "This tool helps me stay connected with potential clients and partners. Instant capture means no missed follow-ups.",
    image: "https://randomuser.me/api/portraits/men/27.jpg",
    name: "Deepak Mathur",
    role: "Mind Wires Founder",
  },
];

const firstColumn = testimonials.slice(0, 3);
const secondColumn = testimonials.slice(3, 6);
const thirdColumn = testimonials.slice(6, 9);

const Testimonial = () => {
  return (
    <section className="relative my-20 bg-background">
      <div className="container z-10 mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
          viewport={{ once: true }}
          className="flex flex-col items-center text-white justify-center max-w-[540px] mx-auto"
        >
          <span className="text-sm font-semibold">Testimonial</span>
          <h1 className="inline-block text-3xl font-bold leading-tight tracking-tight text-transparent sm:text-4xl md:text-5xl bg-clip-text bg-gradient-to-b from-white to-white/70">
            What our users say
          </h1>

          <p className="mt-5 text-center opacity-75">
            See what our customers have to say about us.
          </p>
        </motion.div>

        <div className="flex justify-center gap-6 mt-10 [mask-image:linear-gradient(to_bottom,transparent,black_25%,black_75%,transparent)] max-h-[740px] overflow-hidden">
          <TestimonialsColumn testimonials={firstColumn} duration={15} />
          <TestimonialsColumn
            testimonials={secondColumn}
            className="hidden md:block"
            duration={19}
          />
          <TestimonialsColumn
            testimonials={thirdColumn}
            className="hidden lg:block"
            duration={17}
          />
        </div>
      </div>
    </section>
  );
};

export default Testimonial;
