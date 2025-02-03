// getRecommendations.js
import axios from 'axios';

const getRecommendations = async (
  formData = { selectedPreferences: [], selectedFeatures: [] },
  products
) => {
  
  //Requisição para obter os produtos
  let fetchedProducts =  await axios.get('http://localhost:3001/products').then(response => response.data);

  //Filtragem dos produtos de acordo com as preferências e features selecionadas
  let productsFiltered = fetchedProducts.filter(product => {
    
      // Verifica se possui alguma preferência selecionada
      const userSelectedAnyPreference = formData.selectedPreferences?.length > 0;

      // Agora verifica se as preferências selecionadas estão contidas nas preferências do produto
      const hasSelectedPreferences = 
      userSelectedAnyPreference ? product.preferences.some(preference => formData.selectedPreferences.includes(preference))
      : false;


      // Verifica se possui alguma feature selecionada
      const userSelectedAnyFeature = formData.selectedFeatures?.length > 0;

      // Agora verifica se as features selecionadas estão contidas nas features do produto
      const hasSelectedFeatures = 
      userSelectedAnyFeature ? product.features.some(feature => formData.selectedFeatures.includes(feature))
      : false;


      return (hasSelectedPreferences || hasSelectedFeatures);
  });
  // Definindo as recomendações de acordo com o tipo selecionado
  switch (formData.selectedRecommendationType) {
    case 'SingleProduct': 
    productsFiltered = [productsFiltered.pop()];
      break;
    case 'MultipleProducts':
      productsFiltered = productsFiltered;
      break;
    default:
      productsFiltered = [];
      break;
  }
  return productsFiltered;

};

export default { getRecommendations };
