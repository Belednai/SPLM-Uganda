import { Calendar, Users, Award, Globe, Shield, Target, Handshake } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import drJohnGarang from "@/assets/Dr. John Garang De Mabior.png";

const HistoryTimeline = () => {
  const timelineEvents = [
    {
      year: "1983",
      date: "May 16",
      title: "SPLM/SPLA Founded",
      description: "The Sudan People's Liberation Movement (SPLM) and its armed wing, the Sudan People's Liberation Army (SPLA), were founded in 1983 under the leadership of Dr. John Garang de Mabior following the Bor Mutiny of May 16, 1983. The rebellion emerged after President Jaafar Nimeiry revoked southern autonomy, imposed Sharia law, and attempted to transfer southern troops north.",
      icon: Users,
      highlight: true
    },
    {
      year: "1983-1991",
      title: "Ethiopian Alliance Period",
      description: "Following the Bor Mutiny and formation after Nimeiry's oppressive policies, SPLM/SPLA receives extensive support from Mengistu Haile Mariam's Ethiopia, establishing bases and training camps. Movement evolves from initial revolutionary platform to broadly socialist ideology during this period.",
      icon: Shield,
      highlight: false
    },
    {
      year: "1983-2005",
      title: "Second Sudanese Civil War",
      description: "SPLM/SPLA leads the struggle against Sudan's central government in the longest civil war in African history. Over 2 million lives lost and millions displaced in the fight for autonomy and democratic governance.",
      icon: Award,
      highlight: true
    },
    {
      year: "1991",
      title: "Major Split and Reorganization",
      description: "SPLA fragments when commanders like Riek Machar Teny-Dhurgon and Lam Akol break away, accusing Garang of dictatorial behavior. This leads to internal conflicts but also democratic reforms within the movement.",
      icon: Target,
      highlight: false
    },
    {
      year: "2005",
      date: "January 9",
      title: "Comprehensive Peace Agreement",
      description: "Historic peace agreement signed in Nairobi, ending the civil war. Agreement provides for power-sharing, wealth-sharing, and the right of South Sudan to hold an independence referendum after six years.",
      icon: Handshake,
      highlight: true
    },
    {
      year: "2005-2011",
      title: "Interim Period",
      description: "SPLM enters government of national unity with John Garang as First Vice President. After Garang's death in July 2005, Salva Kiir Mayardit becomes SPLM Chairman and continues the peace process.",
      icon: Calendar,
      highlight: false
    },
    {
      year: "2011",
      date: "July 9",
      title: "South Sudan Independence",
      description: "South Sudan becomes independent with SPLM as the ruling party after a successful referendum (98.83% voted for independence) through the leadership of H.E Gen. Salva Kiir Mayardit. SPLM branches in Sudan reform into SPLM-North to continue struggle in Sudan.",
      icon: Globe,
      highlight: true
    },
    {
      year: "2013-2018",
      title: "Internal Crisis and Factions",
      description: "Political crisis leads to formation of various SPLM factions: SPLM-Juba (government), SPLM-IO (Riek Machar's opposition), and other splinter groups. This period marked by civil conflict but also democratic evolution.",
      icon: Target,
      highlight: false
    },
    {
      year: "2018-Present",
      title: "Revitalized Peace & Diaspora Chapters",
      description: "Revitalized Agreement on Resolution of Conflict signed. SPLM Uganda Chapter and other diaspora chapters continue the legacy, organizing members abroad and maintaining democratic principles while supporting homeland development.",
      icon: Globe,
      highlight: true
    }
  ];

  return (
    <section id="history" className="py-20 bg-gradient-to-b from-background to-muted">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-6">
            Our <span className="text-primary">Liberation</span> Legacy
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Founded May 16, 1983 under Dr. John Garang de Mabior's leadership following the Bor Mutiny, 
            SPLM has remained committed to democratic ideals, human rights, and the vision of a united, secular Sudan.
          </p>
        </div>

        {/* Founders Section */}
        <div className="mb-16">
          <Card className="max-w-6xl mx-auto overflow-hidden shadow-lg">
            <CardContent className="p-0">
              <div className="grid md:grid-cols-2 gap-0">
                <div className="p-6 md:p-8 flex flex-col justify-center">
                  <h3 className="text-2xl md:text-3xl font-bold text-primary mb-4">
                    Founding Fathers of Liberation
                  </h3>
                  <p className="text-muted-foreground text-lg leading-relaxed mb-6">
                    The Sudan People's Liberation Movement (SPLM) and its armed wing, the Sudan People's Liberation Army (SPLA), were founded in 1983 under the leadership of <span className="font-semibold text-foreground">Dr. John Garang de Mabior</span> following the Bor Mutiny of May 16, 1983. The rebellion emerged after President Jaafar Nimeiry revoked southern autonomy, imposed Sharia law, and attempted to transfer southern troops north.
                  </p>
                  <div className="mb-4">
                    <h4 className="text-lg font-bold text-primary mb-2">The 12 Founding Fathers of SPLM/SPLA</h4>
                    <ul className="list-disc list-inside text-foreground text-base space-y-1">
                      <li><span className="font-semibold">Dr. John Garang de Mabior</span> – Founding Chairman and Commander-in-Chief</li>
                      <li><span className="font-semibold">Gen. Salva Kiir Mayardit</span> – Founding member, later Chairman and President</li>
                      <li><span className="font-semibold">Kerubino Kuanyin Bol</span> – Sparked the Bor Mutiny, second in command</li>
                      <li><span className="font-semibold">William Nyuon Bany</span> – First Chief of Staff of the SPLA</li>
                      <li><span className="font-semibold">Arok Thon Arok</span> – Deputy Chief of Staff for Administration and Logistics</li>
                      <li><span className="font-semibold">Joseph Oduho</span> – Founding Chairman of SPLM (political wing)</li>
                      <li><span className="font-semibold">Martin Majier Gai</span> – Legal expert, Deputy Speaker of the Southern Legislative Assembly</li>
                      <li><span className="font-semibold">Martin Manyiel Ayuel</span> – Senior founding member and military leader</li>
                      <li><span className="font-semibold">Yusuf Kuwa Mekki</span> – Commander of the New Cush brigade, Nuba Mountains leader</li>
                      <li><span className="font-semibold">Gillario Modi</span> – Founding member and senior commander</li>
                      <li><span className="font-semibold">Ngachigak Ngachiluk</span> – Led the “Scorpion” forces, promoted for capturing Boma</li>
                      <li><span className="font-semibold">Lual Diing Wol</span> – “Baba Africa,” early advisor and organizer</li>
                    </ul>
                  </div>
                  <div className="space-y-2">
                    <div className="text-sm font-medium text-primary">
                      "Our vision is of a New Sudan, free from racism, tribalism, sectarianism and all forms of discrimination and marginalization."
                    </div>
                    <div className="text-xs text-muted-foreground">
                      - Dr. John Garang de Mabior, SPLM Manifesto 1983
                    </div>
                  </div>
                </div>
                <div className="relative h-64 md:h-auto">
                  <img 
                    src={drJohnGarang} 
                    alt="Dr. John Garang de Mabior" 
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-primary/20 to-transparent"></div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Key Facts Box */}
        <div className="mb-16">
          <Card className="max-w-5xl mx-auto border-primary/20 shadow-lg">
            <CardContent className="p-8">
              <h3 className="text-2xl font-bold text-primary mb-6 text-center">Key Historical Facts</h3>
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                <div className="text-center">
                  <div className="text-3xl font-bold text-secondary mb-2">42+</div>
                  <div className="text-sm text-muted-foreground">Years of Liberation Struggle</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-secondary mb-2">2M+</div>
                  <div className="text-sm text-muted-foreground">Lives Lost in Civil War</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-secondary mb-2">98.83%</div>
                  <div className="text-sm text-muted-foreground">Independence Referendum Support</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-accent mb-2">3</div>
                  <div className="text-sm text-muted-foreground">Main SPLM Factions Today</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-accent mb-2">Global</div>
                  <div className="text-sm text-muted-foreground">Diaspora Network</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-accent mb-2">Unity</div>
                  <div className="text-sm text-muted-foreground">Core Philosophy</div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Timeline */}
        <div className="relative">
          {/* Timeline Line */}
          <div className="absolute left-4 md:left-1/2 top-0 bottom-0 w-1 bg-gradient-to-b from-primary via-secondary to-accent transform md:-translate-x-1/2"></div>

          <div className="space-y-12">
            {timelineEvents.map((event, index) => {
              const IconComponent = event.icon;
              const isLeft = index % 2 === 0;
              
              return (
                <div key={index} className={`relative flex items-center ${!isLeft && 'md:flex-row-reverse'}`}>
                  {/* Timeline Node */}
                  <div className="absolute left-4 md:left-1/2 w-4 h-4 transform md:-translate-x-1/2 z-10">
                    <div className={`w-full h-full rounded-full border-4 border-background ${
                      event.highlight ? 'bg-primary' : 'bg-secondary'
                    }`}></div>
                  </div>

                  {/* Content Card */}
                  <div className={`ml-12 md:ml-0 w-full md:w-5/12 ${!isLeft && 'md:mr-auto'} ${isLeft && 'md:ml-auto'}`}>
                    <Card className={`${event.highlight ? 'border-primary/30 shadow-lg' : 'border-border'} hover:shadow-xl transition-all duration-300`}>
                      <CardContent className="p-6">
                        <div className="flex items-start space-x-4">
                          <div className={`p-3 rounded-lg ${event.highlight ? 'bg-primary/10' : 'bg-secondary/10'}`}>
                            <IconComponent className={`w-6 h-6 ${event.highlight ? 'text-primary' : 'text-secondary'}`} />
                          </div>
                          <div className="flex-1">
                            <div className="flex items-center space-x-3 mb-2">
                              <span className={`text-2xl font-bold ${event.highlight ? 'text-primary' : 'text-secondary'}`}>
                                {event.year}
                              </span>
                              {event.date && (
                                <span className="text-sm text-muted-foreground bg-muted px-2 py-1 rounded">
                                  {event.date}
                                </span>
                              )}
                            </div>
                            <h4 className="text-xl font-semibold text-foreground mb-3">
                              {event.title}
                            </h4>
                            <p className="text-muted-foreground leading-relaxed">
                              {event.description}
                            </p>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};

export default HistoryTimeline;