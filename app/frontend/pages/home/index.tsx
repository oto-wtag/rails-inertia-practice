import { Head, Link } from "@inertiajs/react"
import WebLayout from "@/layouts/web-layout"
import {
  GraduationCap,
  Plane,
  Trophy,
  Globe,
  Handshake,
  ShieldCheck,
  Map,
  BookOpen,
  type LucideIcon,
} from "lucide-react"
import { aboutPath } from "@/routes"
import Graduates from "@/assets/graduates.jpg"
import ArrowIcon from "@/assets/arrow.svg"

type Feature = {
  icon: LucideIcon
  title: string
  description: string
}

export default function Welcome() {
  const features: Feature[] = [
    {
      icon: Globe,
      title: "Global Opportunities",
      description:
        "Access top universities and programs across the world with our expert guidance.",
    },
    {
      icon: GraduationCap,
      title: "Academic Guidance",
      description:
        "Get personalized advice to match your career goals with the right courses and institutions.",
    },
    {
      icon: Map,
      title: "End-to-End Support",
      description:
        "From applications to visas, we simplify the entire process so you can focus on your future.",
    },
    {
      icon: Handshake,
      title: "Trusted Partnerships",
      description:
        "We work closely with leading universities to provide authentic and reliable opportunities.",
    },
    {
      icon: ShieldCheck,
      title: "Safe & Secure",
      description:
        "Your applications, documents, and future are handled with integrity and care.",
    },
    {
      icon: BookOpen,
      title: "Test Preparation",
      description:
        "Get support for IELTS, TOEFL, SAT, and other exams to maximize your admission chances.",
    },
  ]

  return (
    <WebLayout>
      <Head title="Home" />
      <h1>Home</h1>
      {/* <section className="relative space-y-20 p-20 text-center">
        <div className="relative w-full space-y-5">
          <div className="relative w-full">
            <h1 className="font-serif text-4xl leading-normal font-bold md:text-6xl">
              <span className="relative inline-block">
                Global
                <img
                  src={ArrowIcon}
                  alt="arrow icon"
                  className="absolute top-full -left-24 size-20 -translate-y-1/2 rotate-12 md:-left-36 md:size-32 xl:-left-48 dark:invert"
                />
              </span>
              <span className="after:bg-primary/70 relative inline-block after:absolute after:bottom-3 after:left-1/2 after:-z-10 after:h-7 after:w-[105%] after:-translate-x-1/2 after:content-['']">
                Success
              </span>
              Starts with <br />
              the Right Study
              <span className="after:bg-primary/70 relative inline-block after:absolute after:bottom-3 after:left-1/2 after:-z-10 after:h-7 after:w-[105%] after:-translate-x-1/2 after:content-['']">
                Consultation
              </span>
              .
            </h1>
          </div>
          <p className="text-muted-foreground text-base">
            Your dreams deserve the right direction. From consultation to
            admission, we're with you every step of the way.
          </p>
        </div>
        <div className="space-y-20">
          <div className="relative h-96 w-full md:h-[500px]">
            <div className="bg-muted absolute -top-6 left-2 z-10 space-y-4 rounded-md p-3 text-start shadow-md md:left-10">
              <div className="flex items-center gap-2">
                <Plane className="text-muted-foreground" />
                <p>100% Visa Success Rate</p>
              </div>
              <div className="flex items-center gap-2">
                <GraduationCap className="text-muted-foreground" />
                <p>100% Student Satisfaction</p>
              </div>
            </div>
            <img
              src={Graduates}
              alt="Graduates Tossing Graduation Cap"
              className="h-full w-full rounded-md object-cover object-center shadow"
            />
            <div className="bg-foreground text-background absolute right-2 -bottom-36 z-10 rounded-md text-start shadow-md md:right-10 md:-bottom-24">
              <div className="relative px-5 py-4">
                <h5>Out Popular Services</h5>
                <div className="bg-primary absolute -top-5 -left-5 rounded p-2">
                  <Trophy className="text-white" />
                </div>
              </div>
              <div className="border-background space-y-3 border-y px-5 py-4">
                <p>IELTS Preparation</p>
                <p>Visa Preparation</p>
                <p>SOP Assistance</p>
              </div>
              <div className="px-5 py-4">
                <Link href={aboutPath()}>See More...</Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-12 md:py-32">
        <div className="mx-auto max-w-5xl space-y-8 px-6 md:space-y-12">
          <div className="relative z-10 mx-auto max-w-xl space-y-4 text-center md:space-y-6">
            <h2 className="text-4xl font-medium text-balance lg:text-5xl">
              What Makes Us <strong>Special?</strong>
            </h2>
            <p>
              We’re more than just an education consultancy—we’re your trusted
              partner in building a brighter future. From choosing the right
              university to settling in abroad, we guide you at every step.
            </p>
          </div>

          <div className="relative mx-auto grid max-w-2xl gap-4 sm:grid-cols-2 lg:max-w-4xl lg:grid-cols-3">
            {features.map(({ icon: Icon, title, description }) => (
              <div
                key={title}
                className="space-y-2 rounded-md border p-8 shadow"
              >
                <div className="flex items-center gap-2">
                  <Icon className="size-4" />
                  <h3 className="font-bold">{title}</h3>
                </div>
                <p>{description}</p>
              </div>
            ))}
          </div>
        </div>
      </section> */}
    </WebLayout>
  )
}
