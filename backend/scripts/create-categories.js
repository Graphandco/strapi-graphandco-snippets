const Strapi = require("@strapi/strapi");

async function createCategories() {
   const app = await Strapi().load();

   try {
      // Créer la catégorie GIT
      const gitCategory = await strapi.entityService.create(
         "api::category.category",
         {
            data: {
               name: "GIT",
               slug: "git",
               color: "#f05032",
               publishedAt: new Date(),
            },
         }
      );
      console.log("✅ Catégorie GIT créée:", gitCategory);

      // Créer la catégorie Debian
      const debianCategory = await strapi.entityService.create(
         "api::category.category",
         {
            data: {
               name: "Debian",
               slug: "debian",
               color: "#a81c3d",
               publishedAt: new Date(),
            },
         }
      );
      console.log("✅ Catégorie Debian créée:", debianCategory);

      console.log("🎉 Toutes les catégories ont été créées avec succès !");
   } catch (error) {
      console.error("❌ Erreur lors de la création des catégories:", error);
   } finally {
      await app.destroy();
   }
}

createCategories();
