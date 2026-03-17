/**
 * menus.js
 * Données statiques de l'application : menus, plats, catégories, tables et commandes.
 * Chaque export est utilisé comme source initiale dans les vues via ref([...data]).
 */

/** Liste des menus disponibles dans le restaurant */
export const menus = [
    { id: 1, name: "Principal", description: "Carte principale du restaurant avec les plats les plus populaires", active: true },
    { id: 2, name: "Déjeuner", description: "Menu disponible uniquement à midi avec des plats rapides", active: true },
    { id: 3, name: "Dîner", description: "Menu complet proposé le soir avec entrées, plats et desserts", active: true },
    { id: 4, name: "Petit-déjeuner", description: "Menu du matin avec café, omelettes, viennoiseries et jus", active: true },
    { id: 5, name: "Boisson", description: "Carte des boissons froides et chaudes", active: true },
    { id: 6, name: "Dessert", description: "Sélection de desserts et pâtisseries", active: true },
    { id: 7, name: "Enfants", description: "Menu spécial pour enfants avec portions adaptées", active: true },
    { id: 8, name: "Brunch", description: "Menu brunch disponible les week-ends", active: true },
    { id: 9, name: "Spécial", description: "Menu avec plats spéciaux du chef", active: true },
    { id: 10, name: "Saisonnier", description: "Menu composé de plats selon la saison", active: true }
    ];
    

/** Liste des plats rattachés aux menus */
export const plates = [
    { id: 1, name: 'Pâtes Carbonara', description: 'Pâtes avec sauce carbonara', category: 'Principal', price: 12, active: true },
    { id: 2, name: 'Salade César', description: 'Salade avec poulet grillé', category: 'Dîner', price: 8, active: true },
    { id: 3, name: 'Steak Frites', description: 'Steak accompagné de frites', category: 'Dessert', price: 18, active: true },
    { id: 4, name: 'Tarte aux Pommes', description: 'Tarte aux pommes maison', category: 'Dessert', price: 6, active: true },
];


/** Liste des catégories de plats */
export const categories = [
    { id: 1, name: 'Principal' },
    { id: 2, name: 'Déjeuner' },
    { id: 3, name: 'Dîner' },
    { id: 4, name: 'Petit-déjeuner' },
    { id: 5, name: 'Boisson' },
    { id: 6, name: 'Dessert' },
    { id: 7, name: 'Enfants' },
    { id: 8, name: 'Brunch' },
    { id: 9, name: 'Spécial' },
    { id: 10, name: 'Saisonnier' },
];


/** Liste des tables du restaurant */
export const tables = [
    { id: 1, name: 'Table n°1', stat: 'Libre', active: false },
    { id: 2, name: 'Table n°2', stat: 'Occupée', active: true },
    { id: 3, name: 'Table n°2', stat: 'Occupée', active: true },
    // { id: 4, name: 'Table n°2', stat: 'Occupée', active: true },
    // { id: 5, name: 'Table n°2', stat: 'Occupée', active: true },
    // { id: 6, name: 'Table n°2', stat: 'Occupée', active: true },
    // { id: 7, name: 'Table n°2', stat: 'Occupée', active: true },
    // { id: 8, name: 'Table n°2', stat: 'Occupée', active: true },
    // { id: 9, name: 'Table n°2', stat: 'Occupée', active: true },
    // { id: 10, name: 'Table n°2', stat: 'Occupée', active: true },
];


/** Liste des commandes en cours ou terminées */

export const orders = [
    {
        order_id: "Commande #0001",
        time: '19h30',
        table: "Table n°4",
        client: 'Dupont',
        plates: [
            { name: 'Poulet', price: 3500, complement: { name: 'alloco', price: 500 } },
            { name: 'Poisson', price: 2500, complement: { name: 'portion de riz', price: 500 } }
        ],
        comments: 'Sans oignon',
        stat: 'Prêt',
        payment: 'Payé',
        total: 7000
    },
    {
        order_id: "Commande #0002",
        time: '19h35',
        table: "Table n°2",
        client: 'Martin',
        plates: [
            { name: 'Riz au gras', price: 3000, complement: { name: 'poulet braisé', price: 1500 } }
        ],
        comments: '',
        stat: 'En préparation',
        payment: 'En attente',
        total: 4500
    },
    {
        order_id: "Commande #0003",
        time: '19h40',
        table: "Table n°6",
        client: 'Koffi',
        plates: [
            { name: 'Attiéké poisson', price: 3500, complement: { name: 'alloco', price: 500 } }
        ],
        comments: 'Bien pimenté',
        stat: 'En préparation',
        payment: 'Payé',
        total: 4000
    },
    {
        order_id: "Commande #0004",
        time: '19h50',
        table: "Table n°1",
        client: 'Aline',
        plates: [
            { name: 'Spaghetti bolognaise', price: 2800, complement: { name: 'fromage', price: 300 } },
            { name: 'Jus d’orange', price: 1000, complement: { name: '', price: 0 } }
        ],
        comments: '',
        stat: 'Servi',
        payment: 'Payé',
        total: 4100
    },
    {
        order_id: "Commande #0005",
        time: '20h00',
        table: "Table n°8",
        client: 'Bernard',
        plates: [
            { name: 'Pizza Margherita', price: 4500, complement: { name: 'sauce piquante', price: 200 } }
        ],
        comments: 'Pas trop cuite',
        stat: 'En attente',
        payment: 'En attente',
        total: 4700
    },
    {
        order_id: "Commande #0006",
        time: '20h10',
        table: "Table n°5",
        client: 'Fatou',
        plates: [
            { name: 'Burger maison', price: 3200, complement: { name: 'frites', price: 800 } },
            { name: 'Coca cola', price: 1000, complement: { name: '', price: 0 } }
        ],
        comments: '',
        stat: 'Annulé',
        payment: 'Refusé',
        total: 5000
    }
]