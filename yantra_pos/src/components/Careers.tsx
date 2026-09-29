import { motion } from "framer-motion";
import {
  ArrowRight,
  Briefcase,
  Code2,
  Users,
  Rocket,
  HeartHandshake,
} from "lucide-react";
import { Link } from "react-router-dom";
import Navbar from "../components/Navbar";


const openings = [
  {
    title: "Java Backend Developer",
    type: "Full Time",
    location: "Pune / Remote",
    icon: Code2,
  },
  {
    title: "Frontend React Developer",
    type: "Full Time",
    location: "Remote",
    icon: Rocket,
  },
  {
    title: "Product Support Engineer",
    type: "Full Time",
    location: "Pune",
    icon: Users,
  },
];


const values = [
  {
    title: "Build Real Products",
    desc: "Work on enterprise POS solutions used by growing businesses.",
    icon: Briefcase,
  },
  {
    title: "Grow Together",
    desc: "Learn from experienced engineers and solve challenging problems.",
    icon: Users,
  },
  {
    title: "Ownership Culture",
    desc: "Your ideas directly influence product and engineering decisions.",
    icon: HeartHandshake,
  },
];


export default function Careers() {

  return (
    <div className="relative min-h-screen overflow-hidden bg-[#FAF8F4]">

      <Navbar />


      {/* Glow */}
      <div className="pointer-events-none absolute -top-40 -right-40 h-96 w-96 rounded-full bg-[#E8862A]/10 blur-[120px]" />

      <div className="pointer-events-none absolute bottom-0 -left-40 h-96 w-96 rounded-full bg-[#2F6F5E]/10 blur-[120px]" />


      {/* Hero */}

      <section className="relative mx-auto flex max-w-7xl flex-col items-center px-6 pb-20 pt-36 text-center">


        <motion.div
          initial={{opacity:0,y:30}}
          animate={{opacity:1,y:0}}
          transition={{duration:.5}}
          className="rounded-full border border-[#E8862A]/20 bg-[#E8862A]/10 px-5 py-2 text-sm font-semibold text-[#E8862A]"
        >
          Join Yantra Team 🚀
        </motion.div>



        <motion.h1
          initial={{opacity:0,y:30}}
          animate={{opacity:1,y:0}}
          transition={{delay:.1}}
          className="mt-8 max-w-4xl text-5xl font-black tracking-tight text-[#14213D] md:text-6xl"
        >
          Build the future of
          <span className="text-[#E8862A]">
            {" "}business technology
          </span>
        </motion.h1>



        <p className="mt-6 max-w-2xl text-lg leading-relaxed text-[#14213D]/60">
          We are building powerful enterprise tools that help retailers,
          restaurants and businesses operate smarter.
          Join us and create products that impact real users.
        </p>



        <Link
          to="#jobs"
          className="group mt-10 flex items-center gap-2 rounded-full bg-[#E8862A] px-8 py-4 font-semibold text-white shadow-[0_15px_35px_rgba(232,134,42,.3)] transition hover:scale-105"
        >
          View Open Positions

          <ArrowRight
            size={18}
            className="transition group-hover:translate-x-1"
          />

        </Link>


      </section>





      {/* Values */}

      <section className="mx-auto max-w-7xl px-6 pb-20">

        <div className="grid gap-6 md:grid-cols-3">

          {
            values.map((item)=>{

              const Icon=item.icon;

              return (

                <motion.div
                  whileHover={{y:-8}}
                  key={item.title}
                  className="
                  rounded-3xl
                  border border-[#14213D]/10
                  bg-white
                  p-8
                  shadow-[0_25px_60px_-20px_rgba(20,33,61,.12)]
                  "
                >

                  <div className="
                  flex h-12 w-12 items-center justify-center 
                  rounded-2xl
                  bg-[#E8862A]/10
                  text-[#E8862A]
                  ">

                    <Icon size={22}/>

                  </div>


                  <h3 className="mt-6 text-xl font-bold text-[#14213D]">
                    {item.title}
                  </h3>


                  <p className="mt-3 text-sm leading-relaxed text-[#14213D]/60">
                    {item.desc}
                  </p>


                </motion.div>

              )

            })
          }


        </div>


      </section>







      {/* Jobs */}

      <section
      id="jobs"
      className="mx-auto max-w-7xl px-6 pb-28"
      >


        <div className="mb-10">

          <h2 className="text-3xl font-black text-[#14213D]">
            Open Positions
          </h2>

          <p className="mt-2 text-[#14213D]/60">
            Find your role and start building with us.
          </p>

        </div>




        <div className="grid gap-6">


        {
          openings.map((job)=>{

            const Icon=job.icon;


            return (

              <motion.div

              whileHover={{scale:1.01}}

              key={job.title}

              className="
              flex flex-col gap-5
              rounded-3xl
              border border-[#14213D]/10
              bg-white
              p-7
              shadow-[0_25px_60px_-20px_rgba(20,33,61,.12)]
              md:flex-row
              md:items-center
              md:justify-between
              "

              >


                <div className="flex items-center gap-5">


                  <div className="
                  flex h-14 w-14 items-center justify-center
                  rounded-2xl
                  bg-[#2F6F5E]/10
                  text-[#2F6F5E]
                  ">

                    <Icon size={26}/>

                  </div>



                  <div>

                    <h3 className="text-xl font-bold text-[#14213D]">
                      {job.title}
                    </h3>


                    <div className="mt-2 flex gap-3 text-sm text-[#14213D]/55">

                      <span>
                        {job.type}
                      </span>

                      <span>
                        •
                      </span>

                      <span>
                        {job.location}
                      </span>

                    </div>


                  </div>



                </div>





                <button
                className="
                rounded-full
                border border-[#E8862A]/30
                px-6 py-3
                font-semibold
                text-[#E8862A]
                transition
                hover:bg-[#E8862A]
                hover:text-white
                "
                >

                  Apply Now

                </button>



              </motion.div>

            )

          })
        }


        </div>


      </section>




      {/* CTA */}

      <section className="mx-auto max-w-7xl px-6 pb-24">


        <div
        className="
        rounded-[32px]
        bg-[#14213D]
        p-10
        text-center
        "
        >


          <h2 className="text-3xl font-black text-white">

            Don't see your role?

          </h2>


          <p className="mx-auto mt-4 max-w-xl text-white/60">

            Send us your profile. We are always looking for talented people.

          </p>



          <button
          className="
          mt-8
          rounded-full
          bg-[#E8862A]
          px-8 py-3
          font-semibold
          text-white
          "
          >

            Contact HR

          </button>


        </div>


      </section>



    </div>
  );
}