import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { User, Star, MapPin } from "lucide-react";
import salvaKiir from "@/assets/H.E Gen. Salva Kiir Mayardit.jpg";
import bolMel from "@/assets/H.E Dr. Bol Mel.png";
import paulLogale from "@/assets/Prof. Paul Logale.jpg";
import splmLogo from "@/assets/splm-uganda-logo.png";
import dhieuSimonChol from "@/assets/CDE Dhieu Simon Chol.jpg";

const splmLeaders = [
  {
    name: "H.E Gen. Salva Kiir Mayardit",
    role: "Chairperson, SPLM",
    years: "2005–present",
    bio: "President of South Sudan and SPLM Chairperson, leading the party since 2005 and a key figure in the country's independence.",
    photo: salvaKiir,
  },
  {
    name: "H.E Dr. Benjamin Bol Mel",
    role: "First deputy Chairperson, SPLM",
    years: "2025–present",
    bio: "First deputy Chairperson of SPLM, supporting the party's vision and leadership in South Sudan and the diaspora.",
    photo: bolMel,
  },
  {
    name: "Prof. Paul Logale",
    role: "Secretary General, SPLM",
    years: "2025–present",
    bio: "Secretary General of SPLM, responsible for party administration and organizational strategy.",
    photo: paulLogale,
  },
];

const ugandaChapterLeaders = [
  {
    name: "CDE. Dhieu Simon Chol",
    role: "Chairperson, SPLM Uganda Chapter",
    contact: "+256751811010",
    photo: dhieuSimonChol,
  },
];

const LeadershipSection = () => {
  return (
    <section id="leadership" className="py-20 bg-gradient-to-b from-background to-muted">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* SPLM Leadership */}
        <div className="mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-6 text-center">
            SPLM <span className="text-primary">Leadership</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto text-center mb-10">
            Honoring the visionaries who lead the Sudan People’s Liberation Movement.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {splmLeaders.map((leader, idx) => (
              <Card key={idx} className="overflow-hidden shadow-lg border-primary/10 h-full flex flex-col justify-between">
                <CardContent className="flex flex-col items-center text-center p-6 h-full">
                  <img
                    src={leader.photo}
                    alt={leader.name}
                    className="w-24 h-28 object-cover rounded-lg border border-primary/20 bg-white mb-4"
                  />
                  <h3 className="text-xl font-bold text-primary mb-1 flex items-center justify-center gap-x-2">
                    <Star className="w-4 h-4 text-secondary" />
                    {leader.name}
                  </h3>
                  <div className="text-sm text-muted-foreground mb-1">{leader.role}</div>
                  <div className="text-xs text-muted-foreground mb-2">{leader.years}</div>
                  <p className="text-sm text-foreground mb-2">{leader.bio}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Uganda Chapter Leadership */}
        <div>
          <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-6 text-center">
            Uganda Chapter <span className="text-primary">Leadership</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto text-center mb-10">
            Meet the current SPLM Uganda Chapter executive team.
          </p>
          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {ugandaChapterLeaders.map((leader, idx) => (
              <Card key={idx} className="overflow-hidden shadow-md border-primary/10">
                <CardHeader className="flex flex-col items-center pt-8 pb-2">
                  <img
                    src={leader.photo}
                    alt={leader.name}
                    className="w-20 h-20 object-cover rounded-full border border-primary/20 bg-white mb-3"
                  />
                  <CardTitle className="text-lg font-bold text-primary text-center">
                    {leader.name}
                  </CardTitle>
                  <div className="text-sm text-muted-foreground text-center mb-1">{leader.role}</div>
                  <div className="flex items-center justify-center text-xs text-muted-foreground">
                    <MapPin className="w-3 h-3 mr-1 text-secondary" /> Kampala, Uganda
                  </div>
                </CardHeader>
                <CardContent className="text-center pb-6">
                  <div className="text-xs text-muted-foreground mb-2">
                    <User className="w-3 h-3 inline mr-1 text-primary" />
                    <a href={`tel:${leader.contact}`} className="hover:underline">{leader.contact}</a>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default LeadershipSection; 