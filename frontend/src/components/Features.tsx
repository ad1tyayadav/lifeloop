import { FocusCards } from "@/components/ui/focus-cards";

export function FocusCardsDemo() {
    const cards = [
        {
            featNo: 1,
            title: "The Chaos Lab",
            tagline: "Where uncertainty becomes a controlled experiment.",
            description: "LIFELOOP's Chaos Lab lets teams simulate crises before they happen. Upload real operational data, trigger hypothetical client loss, downtime, or compliance shocks, and instantly watch how your systems react. It transforms fear into foresight — giving IT leaders the power to practice survival before the storm hits.",
            src: "/Images/F-1.jpg",
        },
        {
            featNo: 2,
            title: "Chain Reaction Engine",
            tagline: "Every decision sparks a ripple.",
            description: "Our AI maps the invisible domino effects across departments — how one disruption spreads through revenue, trust, and workload. It reveals interdependencies that humans miss and helps leaders predict second- and third-order impacts in real time. This is not analytics. It's cause-and-effect intelligence.",
            src: "/Images/F-2.jpg",
        },
        {
            featNo: 3,
            title: "Financial Black Mirror Mode",
            tagline: "See the future of your finances before it happens.",
            description: "Run futuristic 'what-if' projections of financial stability. LIFELOOP's AI models forecast how every client churn or outage reshapes revenue, contracts, and future liquidity. It's like looking into your business's mirror dimension — except this reflection tells you what not to do.",
            src: "/Images/F-3.jpg",
        },
        {
            featNo: 4,
            title: "Emotional Emergency Monitor",
            tagline: "Because emotion drives retention.",
            description: "Tracks satisfaction and stress patterns across clients and teams. Detects emotional fatigue or risk zones before they become losses. By combining data signals with behavioral AI, LIFELOOP alerts leaders when trust starts fading — keeping relationships stable when the system trembles.",
            src: "/Images/F-4.jpg",
        },
        {
            featNo: 5,
            title: "Exportable AI Core",
            tagline: "Your intelligence, anywhere.",
            description: "Every simulation in LIFELOOP can be exported as a self-contained AI agent — capable of running on other environments or integrating with MSP dashboards. This means your strategy engine travels with you — from boardrooms to servers — extending LIFELOOP's brain across your entire digital ecosystem.",
            src: "/Images/F-5.jpg",
        },
        {
            featNo: 6,
            title: "The Loop Report",
            tagline: "Your business, decoded monthly.",
            description: "At the end of every simulation cycle, LIFELOOP generates a Loop Report — an AI-crafted digest that breaks down your system's current resilience, risks, and next-best actions. Readable by humans, respected by data. Think of it as your business's monthly mirror — written by AI, designed for decision.",
            src: "/Images/F-6.jpg",
        },
        {
            featNo: 7,
            title: "SDCC",
            tagline: "When chaos hits, it takes the wheel.",
            description: "SDCC automatically generates response playbooks for any simulated or real crisis. It predicts what happens next, assigns dynamic recovery steps, and keeps operations balanced under extreme pressure. This is autonomous stability — an AI co-pilot that thinks faster than the fall.",
            src: "/Images/F-7.jpg",
        }
    ];

    return (
        <div className='pt-18 pb-20 bg-white/80'>
            <div className="text-center mb-12">
                <h2 className="text-3xl font-bold text-gray-900 mb-4">Features</h2>
                <p className="text-gray-600">Lorem ipsum dolor Lorem ipsum dolor Lorem</p>
            </div>
            <FocusCards cards={cards} />
        </div>
    )
}