import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  HomeFilled,
  LoadingOutlined,
  HourglassFilled,
  MessageFilled,
  SignalFilled,
} from "@ant-design/icons";
import bai from "../../assets/bai.png";
import cuckooh from "../../assets/cuckooh.png";
import smartMasonry from "../../assets/smartMasonry.png";
import check from "../../assets/check.png";
import hero from "../../assets/homepage/laptop.jpg";
import banner from "../../assets/homepage/banner.png";
import Accordion from "../../components/Accordion";
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";

const Home = () => {
  const navigate = useNavigate();

  const goToPage = (path) => {
    navigate(path);
  };

  const [openAccordionIndex, setOpenAccordionIndex] = useState(0);
  const faqData = [
    {
      title: "How can I trust your insights?",
      content:
        "RONI AI’s state-of-the-art algorithms have been trained by CFO-level finance professionals. In beta phase, they are double-checked by CFO-level finance professionals to ensure the quality of the answers.",
    },
    {
      title: "How accurate is your estimate?",
      content:
        "The estimates that RONI AI can do can be equivalent to the estimates made by a CFO-level finance professional. In some cases, it can be more precise by considering seasonality and growth in data. By uploading your past accounting data, we gain a realistic understanding of your business situation. Our ultimate aim is to surpass the level of estimation accuracy a human expert could provide, delivering you unparalleled insights tailored to your business.",
    },
    {
      title: "Is my data safe with you?",
      content:
        "We prioritize the security of your data and employ industry-leading measures to protect it. This includes robust data encryption both in transit and at rest, multi-factor authentication, and strict access controls to limit data access only to authorized personnel.",
    },
    {
      title: "How secure is your server?",
      content:
        "Your data is securely stored on servers hosted in highly secure data centers. These data centers adhere to strict security standards, ensuring the physical safety of your information.",
    },
    {
      title: "Do you share my data with third parties?",
      content:
        "As an AI finance app, we understand the importance of data privacy. We do not share your data with third parties unless required by law or with your explicit consent. Our transparent privacy policy outlines how we handle your data.",
    },
  ];
  return (
    <div
      className="relative flex flex-col mx-auto text-[#333333]
      "
    >
      <div className="sticky top-0 z-50 h-0 lg:h-auto xl:h-0">
        <Navbar />
      </div>
      <section
        id="home"
        className="w-full h-screen flex flex-col lg:flex-row justify-center items-center mx-auto"
      >
        <div className="lg:w-1/2 space-y-8 px-6 md:mt-96 lg:-mt-0">
          <h2 className="text-4xl md:text-5xl font-semibold">
            The First AI Financial Assistant for Entrepreneurs and Business
            Leaders
          </h2>
          <p className="text-lg md:text-xl max-w-3xl mx-auto leading-6 mt-2 text-slate-700">
            Get real-time 1-year budget, financial insights, and financial
            analysis so you can focus on what matters most — growing your
            business!
          </p>
          <button
            onClick={() => {
              goToPage("/register");
            }}
            className="w-fit self-center px-6 py-2 bg-gradient-to-r from-[#EDC6D7] via-[#CDB6D6] to-[#B0A7D4] rounded-full text-slate-700 hover:opacity-90 ease-in transform transition duration-150"
          >
            Get Started for FREE
          </button>
        </div>
        <div className="lg:w-1/2 -mt-12 lg:-mt-0 hidden md:block">
          <img
            src={hero}
            alt=""
            className="object-cover w-full h-auto mx-auto"
          />
        </div>
      </section>

      <section className="py-16 grid lg:grid-cols-3 px-4 font-semibold gap-12 w-full md:translate-y-56 lg:translate-y-0">
        <h2 className="text-3xl md:text-4xl font-bold text-center lg:col-span-3">
          Trusted and preferred by
        </h2>
        <div className="rounded-lg p-8 bg-[#eeeaff] space-y-4">
          <img
            src={cuckooh}
            alt=""
            className="w-32 h-32 rounded-full mx-auto"
          />
          <p className="font-normal">
            "Roni Ai helped me with things that I didn’t know matter so much in
            the growth of my business — like helping me manage my finances and
            best of all forecasting my income the following year."
          </p>
          <h3 className="mt-auto">Cuckooh Calzado</h3>
          <span>Owner of Cuckooh Puffs</span>
        </div>
        <div className="rounded-lg p-8 bg-[#eeeaff] space-y-4">
          <img
            src={smartMasonry}
            alt=""
            className="w-32 h-32 rounded-full mx-auto"
          />
          <p className="font-normal">
            "RoniAI has made creating budgets much simpler. We have shortened
            the time wasted on endless meetings to confirm numbers and make
            working capital decisions. We can't wait to see how it will
            revolutionize our business operations when they deploy the rest of
            their features."
          </p>
          <h3>Dan Relucio</h3>
          <span>President of Smart Masonry</span>
        </div>
        <div className="rounded-lg p-8 bg-[#eeeaff] space-y-4">
          <img src={bai} alt="" className="w-32 h-32 rounded-full mx-auto" />
          <p className="font-normal">
            "I really love how Roni AI answered my questions which regards to my
            financial growth. It even gave me suggestions that help me decide on
            how to scale my business. So easy to use! The perfect assistant that
            is finance-focused."
          </p>
          <h3>Arnel Reodique</h3>
          <span></span>
        </div>
      </section>

      <section className="py-12 text-lg font-semibold h-full min-h-screen flex flex-col justify-center px-4 items-center md:translate-y-24 lg:translate-y-0">
        <h2 className="text-3xl md:text-4xl font-semibold text-center">
          What can it do?
        </h2>
        <p className="font-normal text-center text-base md:text-xl max-w-4xl mx-auto leading-6 mt-2 text-slate-700 mb-16">
          Designed with the analytical mind of a financial advisor, Roni AI
          gives you more time to focus on your core business goals. Currently,
          Roni AI has the following capabilities:
        </p>
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="flex flex-col p-6 rounded-xl bg-white border gap-1 border-black text-center md:text-left items-center md:items-baseline">
            <HomeFilled
              style={{
                fontSize: "1.5rem",
              }}
              className="p-2 rounded-md border-2 border-[#b599a5] mb-2"
            />
            <h2 className="md:text-xl">Customized financial control panel</h2>
            <p className="text-slate-700 font-normal text-sm md:text-base">
              monitor KPIs that you care about
            </p>
          </div>
          <div className="flex flex-col p-6 rounded-xl bg-white border gap-1 border-black text-center md:text-left items-center md:items-baseline">
            <MessageFilled
              style={{
                fontSize: "1.5rem",
              }}
              className="p-2 rounded-md border-2 border-[#b599a5] mb-2"
            />
            <h2 className="md:text-xl">
              Financial statements analysis and insights
            </h2>
            <p className="text-slate-700 font-normal text-sm md:text-base">
              Uncover valuable trends and gain insights into your financial
              performance.
            </p>
          </div>{" "}
          <div className="flex flex-col p-6 rounded-xl bg-white border gap-1 border-black text-center md:text-left items-center md:items-baseline">
            <HourglassFilled
              style={{
                fontSize: "1.5rem",
              }}
              className="p-2 rounded-md border-2 border-[#b599a5] mb-2"
            />
            <h2 className="md:text-xl">1-year cash budget</h2>
            <p className="text-slate-700 font-normal text-sm md:text-base">
              Take full control of your cash allocation.
            </p>
          </div>{" "}
          <div className="flex flex-col p-6 rounded-xl bg-white border gap-1 border-black text-center md:text-left items-center md:items-baseline">
            <SignalFilled
              style={{
                fontSize: "1.5rem",
              }}
              className="p-2 rounded-md border-2 border-[#b599a5] mb-2"
            />
            <h2 className="md:text-xl">
              Access to growth capital and investment opportunities
            </h2>
            <p className="text-slate-700 font-normal text-sm md:text-base">
              Connect with investors to enhance the value of your business or
              optimize your cash surplus
            </p>
          </div>{" "}
        </div>
      </section>

      <section className="relative bg-[#e4cfd0] flex h-full min-h-screen flex-col w-full md:text-center items-center">
        <div className="absolute -translate-x-1/2 -translate-y-1/3 md:-translate-y-1/2 top-1/2 md:top-1/4 left-1/2 z-10 w-full px-4">
          <h2 className="text-3xl md:text-4xl">
            AI-Powered Financial Solution{" "}
            <span className="font-semibold"> for you.</span>
          </h2>
          <p className="md:text-lg mx-auto leading-6 mt-6 text-slate-700 max-w-4xl">
            Meet Roni AI — your AI finance assistant that will analyze your
            business. Gain a deeper understanding of your finances and make
            informed decisions in a snap!
          </p>
        </div>
        <img
          src={banner}
          className="object-cover h-full w-full hidden md:block absolute z-0"
        />
      </section>

      <section className="min-h-screen h-full flex flex-1 items-center justify-center lg:py-24 md:-translate-y-36 lg:translate-y-0">
        <div className="py-8 lg:w-10/12 md:w-11/12 text-lg font-semibold mb-8 md:mt-64 lg:mt-0 lg:mb-16 bg-gray-100 flex flex-col justify-center px-4 items-center md:rounded-3xl lg:rounded-[60px]">
          <h2 className="text-3xl md:text-4xl font-semibold text-center">
            Gain Competitive Edge with your AI Finance Assistant.
          </h2>
          <p className="text-center text-base md:text-xl max-w-4xl mx-auto leading-6 mt-4 text-slate-700 font-normal">
            Be the first 50 users to have your own AI Finance Assistant and
            unlock exclusive lifetime benefits!
          </p>
          <div className="grid md:grid-cols-2 md:px-8 gap-4 my-8">
            <div className="flex flex-col p-6 rounded-xl bg-white border gap-1 border-black text-center md:text-left items-center md:items-baseline">
              <img src={check} alt="" className="h-11 w-11 mb-2" />
              <h2 className="md:text-xl">Early Access</h2>
              <p className="text-slate-700 font-normal text-sm md:text-base">
                Head start in having a competitive advantage to make your
                financial decisions.
              </p>
            </div>
            <div className="flex flex-col p-6 rounded-xl bg-white border gap-1 border-black text-center md:text-left items-center md:items-baseline">
              <img src={check} alt="" className="h-11 w-11 mb-2" />
              <h2 className="md:text-xl">Lifetime Discount</h2>
              <p className="text-slate-700 font-normal text-sm md:text-base">
                Get 30% off the price for a lifetime.
              </p>
            </div>{" "}
            <div className="flex flex-col p-6 rounded-xl bg-white border gap-1 border-black text-center md:text-left items-center md:items-baseline">
              <img src={check} alt="" className="h-11 w-11 mb-2" />
              <h2 className="md:text-xl">Personalized Onboarding</h2>
              <p className="text-slate-700 font-normal text-sm md:text-base">
                Get help from a finance professional to get the most out of our
                app to suit your needs.
              </p>
            </div>{" "}
            <div className="flex flex-col p-6 rounded-xl bg-white border gap-1 border-black text-center md:text-left items-center md:items-baseline">
              <img src={check} alt="" className="h-11 w-11 mb-2" />
              <h2 className="md:text-xl">Beta Tester Recognition</h2>
              <p className="text-slate-700 font-normal text-sm md:text-base">
                Get acknowledged to be a contributor to our development.
              </p>
            </div>{" "}
          </div>
          <p className="text-center text-sm md:text-lg max-w-4xl mx-auto leading-6 mt-2 text-slate-700 my-6">
            SIGN UP NOW! — LIMITED TIME OFFER valid until October 25.
          </p>
          <button
            onClick={() => {
              goToPage("/sign-up");
            }}
            id="faqs"
            className="w-fit self-center font-normal px-6 py-2 bg-gradient-to-r from-[#EDC6D7] via-[#CDB6D6] to-[#B0A7D4] rounded-full text-slate-700 hover:opacity-90 ease-in transform transition duration-150"
          >
            Sign up here
          </button>
        </div>
      </section>

      <section
        className="flex flex-col justify-center w-full px-4 md:px-8 py-12 mb-10 md:mb-20 lg:mb-8 items-center md:-mt-28 lg:-mt-32"
        
      >
        <div className="max-w-3xl w-full p-4 md:px-12 md:py-8 rounded-xl bg-gradient-to-tr to-[#929ac8] from-[#dccad8] lg:h-[520px]">
          <h2 className="text-3xl md:text-4xl font-semibold">
            Frequently Asked Questions
          </h2>
          <div className="mt-4">
            {faqData.map((item, index) => (
              <Accordion
                key={index}
                title={item.title}
                content={item.content}
                isOpen={openAccordionIndex === index}
                onToggle={() => setOpenAccordionIndex(index)}
              />
            ))}
          </div>
        </div>
      </section>

      <section className="flex space-y-6 bg-black h-96 flex-col justify-center w-full px-4 md:px-16 py-12 text-white text-center items-center">
        <div className="relative">
          <LoadingOutlined style={{ fontSize: "3rem", color: "#B0A7D4" }} />
          <p className="-translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2 absolute tracking-widest font-extrabold text-gray-300">
            AI
          </p>
        </div>
        <h2 className="text-xl md:text-3xl font-semibold max-w-lg tracking-wide">
          Focus on Growing Your Business! Let Roni AI Handle Your Finances.
        </h2>
        <p>Gain LIFETIME BENEFITS. Only until October 25.</p>
        <button
          onClick={() => {
            goToPage("/register");
          }}
          className="w-fit self-center px-6 py-2 bg-gradient-to-r from-[#EDC6D7] via-[#CDB6D6] to-[#B0A7D4] rounded-full text-slate-700 hover:opacity-90 ease-in transform transition duration-150"
        >
          Get Started for FREE
        </button>
      </section>
      <Footer />
    </div>
  );
};

export default Home;
