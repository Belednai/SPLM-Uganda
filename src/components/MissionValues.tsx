import { Target, Heart, Scale, Globe, Users, Lightbulb } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const MissionValues = () => {
  const values = [
    {
      icon: Target,
      title: "Democratic Governance",
      description: "Promoting transparent, accountable, and participatory governance structures that serve all citizens equally."
    },
    {
      icon: Heart,
      title: "Unity in Diversity",
      description: "Celebrating our diverse backgrounds while building bridges of understanding and cooperation across communities."
    },
    {
      icon: Scale,
      title: "Social Justice",
      description: "Fighting for equal rights, opportunities, and dignity for all people regardless of race, religion, or ethnicity."
    },
    {
      icon: Globe,
      title: "Pan-African Vision",
      description: "Strengthening ties across African nations and supporting continental unity and development."
    },
    {
      icon: Users,
      title: "Community Empowerment",
      description: "Building strong, self-reliant communities that can advocate for their needs and aspirations."
    },
    {
      icon: Lightbulb,
      title: "Progressive Leadership",
      description: "Developing leaders who are committed to positive change and sustainable development."
    }
  ];

  return (
    <section id="mission" className="py-20 bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Mission Statement */}
        <div className="text-center mb-20">
          <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-8">
            Our <span className="text-primary">Mission</span> & Values
          </h2>
          <div className="max-w-4xl mx-auto">
            <Card className="border-primary/20 shadow-xl">
              <CardContent className="p-8 md:p-12">
                <blockquote className="text-xl md:text-2xl text-foreground leading-relaxed italic text-center">
                  "To continue the legacy of liberation by fostering democratic governance, 
                  promoting human rights, and building unity among South Sudanese communities 
                  in Uganda and beyond, while working towards a prosperous and peaceful future 
                  for all our people."
                </blockquote>
                <div className="mt-8 text-center">
                  <div className="inline-flex items-center space-x-2 text-primary font-semibold">
                    <span className="w-12 h-px bg-primary"></span>
                    <span>SPLM Uganda Chapter</span>
                    <span className="w-12 h-px bg-primary"></span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Core Values Grid */}
        <div className="mb-16">
          <h3 className="text-3xl font-bold text-center text-foreground mb-12">
            Our Core <span className="text-secondary">Values</span>
          </h3>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {values.map((value, index) => {
              const IconComponent = value.icon;
              return (
                <Card key={index} className="group hover:shadow-xl transition-all duration-300 hover:-translate-y-2 border-border hover:border-primary/30">
                  <CardHeader className="text-center pb-4">
                    <div className="mx-auto w-16 h-16 bg-gradient-to-br from-primary/10 to-secondary/10 rounded-full flex items-center justify-center group-hover:from-primary/20 group-hover:to-secondary/20 transition-all duration-300">
                      <IconComponent className="w-8 h-8 text-primary group-hover:text-primary-glow transition-colors duration-300" />
                    </div>
                    <CardTitle className="text-xl font-semibold text-foreground group-hover:text-primary transition-colors duration-300">
                      {value.title}
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="text-center">
                    <p className="text-muted-foreground leading-relaxed">
                      {value.description}
                    </p>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>

        {/* Historical Context */}
        <div className="bg-gradient-to-r from-primary/5 to-secondary/5 rounded-2xl p-8 md:p-12 border border-primary/10">
          <div className="grid md:grid-cols-2 gap-8 items-center">
            <div>
              <h3 className="text-2xl md:text-3xl font-bold text-foreground mb-6">
                Continuing the Liberation Legacy
              </h3>
              <p className="text-muted-foreground text-lg leading-relaxed mb-6">
                Since our founding in 1983, SPLM has evolved from a liberation movement 
                to a democratic political organization. Today, our Uganda Chapter serves 
                as a bridge between our historical roots and our future aspirations.
              </p>
              <div className="space-y-4">
                <div className="flex items-center space-x-3">
                  <div className="w-2 h-2 bg-primary rounded-full"></div>
                  <span className="text-foreground">Preserving democratic principles established by our founders</span>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="w-2 h-2 bg-secondary rounded-full"></div>
                  <span className="text-foreground">Supporting diaspora communities in Uganda</span>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="w-2 h-2 bg-accent rounded-full"></div>
                  <span className="text-foreground">Building bridges between South Sudan and Uganda</span>
                </div>
              </div>
            </div>
            <div className="text-center">
              <div className="bg-white/50 backdrop-blur-sm rounded-xl p-8 border border-white/20">
                <div className="text-4xl font-bold text-primary mb-2">42+</div>
                <div className="text-muted-foreground mb-4">Years of Service</div>
                <div className="text-4xl font-bold text-secondary mb-2">Unity</div>
                <div className="text-muted-foreground mb-4">In Diversity</div>
                <div className="text-4xl font-bold text-accent mb-2">Future</div>
                <div className="text-muted-foreground">Focused Leadership</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default MissionValues;