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
    { id: 5, name: 'Poulet', description: 'Poulet', category: 'Principal', price: 3500, active: true },
    { id: 6, name: 'Poisson', description: 'Poisson', category: 'Principal', price: 2500, active: true },
    { id: 7, name: 'Riz au gras', description: 'Riz au gras', category: 'Déjeuner', price: 3000, active: true },
    { id: 8, name: 'Attiéké poisson', description: 'Attiéké poisson', category: 'Déjeuner', price: 3500, active: true },
    { id: 9, name: 'Spaghetti bolognaise', description: 'Spaghetti bolognaise', category: 'Dîner', price: 2800, active: true },
    { id: 10, name: "Jus d'orange", description: "Jus d'orange", category: 'Boisson', price: 1000, active: true },
    { id: 11, name: 'Pizza Margherita', description: 'Pizza Margherita', category: 'Dîner', price: 4500, active: true },
    { id: 12, name: 'Burger maison', description: 'Burger maison', category: 'Dîner', price: 3200, active: true },
    { id: 13, name: 'Coca cola', description: 'Coca cola', category: 'Boisson', price: 1000, active: true },
    { id: 14, name: 'alloco', description: 'alloco', category: 'Accompagnement', price: 500, active: true },
    { id: 15, name: 'portion de riz', description: 'portion de riz', category: 'Accompagnement', price: 500, active: true },
    { id: 16, name: 'poulet braisé', description: 'poulet braisé', category: 'Accompagnement', price: 1500, active: true },
    { id: 17, name: 'fromage', description: 'fromage', category: 'Accompagnement', price: 300, active: true },
    { id: 18, name: 'sauce piquante', description: 'sauce piquante', category: 'Accompagnement', price: 200, active: true },
    { id: 19, name: 'frites', description: 'frites', category: 'Accompagnement', price: 800, active: true },
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
    { id: 11, name: 'Accompagnement' },
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
        table: "-",
        type: 'Emporté',
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
        type: 'Sur place',
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
        type: 'Sur place',
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
        table: "-",
        type: 'Emporté',
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
        table: "",
        type: 'Emporté',
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
        table: "",
        type: 'Emporté',
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


export const collaborators = [
    { id: 1, name: 'Erik Azankpo', email: 'erik.azankpo@univ-littoral.fr', role: 'Administrateur', active: false, add_date: '2023-01-15' },
    { id: 2, name: 'John Doe', email: 'john.doe@example.com', role: 'Serveur', active: true, add_date: '2022-05-15' },
    { id: 3, name: 'Jane Smith', email: 'jane.smith@example.com', role: 'Chef', active: true, add_date: '2023-10-05' },
    { id: 4, name: 'Robert Johnson', email: 'robert.johnson@example.com', role: 'Manager', active: true, add_date: '2020-02-18' },
    { id: 5, name: 'Emily Davis', email: 'emily.davis@example.com', role: 'Serveur', active: true, add_date: '2025-01-10' },
    { id: 6, name: 'Michael Wilson', email: 'michael.wilson@example.com', role: 'Cuisinier', active: true, add_date: '2019-01-15' },
    { id: 7, name: 'Sarah Brown', email: 'sarah.brown@example.com', role: 'Réceptionniste', active: true, add_date: '2023-01-15' },
    { id: 8, name: 'David Miller', email: 'david.miller@example.com', role: 'Administrateur', active: true, add_date: '2023-01-15' },
    { id: 9, name: 'Lisa Taylor', email: 'lisa.taylor@example.com', role: 'Serveur', active: true, add_date: '2023-01-15' },
    { id: 10, name: 'James Anderson', email: 'james.anderson@example.com', role: 'Cuisinier', active: true, add_date: '2023-01-15' },
];
