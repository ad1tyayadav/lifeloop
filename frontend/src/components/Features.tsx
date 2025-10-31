import { FocusCards } from "@/components/ui/focus-cards";

export function FocusCardsDemo() {
    const cards = [
        {
            title: "Forest Adventure Lorem ipsum dolor sit amet consectetur adipisicing elit. Iusto eius odit eveniet explicabo nihil magnam vel distinctio aspernatur",
            src: "https://images.unsplash.com/photo-1518710843675-2540dd79065c?q=80&w=3387&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        },
        {
            title: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Iusto eius odit eveniet explicabo nihil magnam vel distinctio aspernatur quas atque, voluptatum nobis",
            src: "https://images.unsplash.com/photo-1600271772470-bd22a42787b3?q=80&w=3072&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        },
        {
            title: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Iusto eius odit eveniet explicabo",
            src: "https://images.unsplash.com/photo-1505142468610-359e7d316be0?q=80&w=3070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        },
        {
            title: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Iusto eius odit eveniet explicabo nihil",
            src: "https://images.unsplash.com/photo-1486915309851-b0cc1f8a0084?q=80&w=3387&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        },
        {
            title: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Iusto eius odit eveniet explicabo nihil magnam",
            src: "https://images.unsplash.com/photo-1507041957456-9c397ce39c97?q=80&w=3456&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        },
        {
            title: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Iusto eius odit eveniet explicabo nihil magnam vel ",
            src: "https://assets.aceternity.com/the-first-rule.png",
        },
    ];

    return <FocusCards cards={cards} />;
}
