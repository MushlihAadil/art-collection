'use strict';
const axios = require('axios');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    // ambil data pake AXIOS
    let fetchData = await axios.get('https://openaccess-api.clevelandart.org/api/artworks')
    let data = fetchData.data.data
    // console.log(fetchData.data.data)
    
    // mapping data 
    const dataMap = data.map((item) => {
      delete item.id

      let image = item.images.web
      if (image === undefined) {
        image = {}
      }
      
      return {
        title: item.title,
        imageUrl: image.url,
        location: item.current_location,
        description: item.description,
        date_create: item.creation_date,
        department: item.department,
        collection: item.collection,
        fun_fact: item.did_you_know,
        createdAt: new Date(),
        updatedAt: new Date()
      };
    });

    // console.log(dataMap[0])

    await queryInterface.bulkInsert('Artworks', dataMap);
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
    */
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Artworks', null, {})
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
  }
};
