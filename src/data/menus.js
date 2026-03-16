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
    { id: 1, tableId: 1, items: [1, 2], total: 22, stat: 'En cours', active: true },
    { id: 2, tableId: 2, items: [3, 4], total: 27, stat: 'Terminé', active: false },
];