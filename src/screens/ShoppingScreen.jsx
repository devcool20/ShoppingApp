import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, StyleSheet, Image, TouchableOpacity, Modal, Button } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { addItemToCart, incrementQuantity, decrementQuantity } from './cartSlice';

const ShoppingScreen = () => {
  const [products, setProducts] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const dispatch = useDispatch();
  const cartItems = useSelector((state) => state.cart.items);

  useEffect(() => {
    fetch('https://fakestoreapi.com/products')
      .then((response) => response.json())
      .then((data) => setProducts(data))
      .catch((error) => console.error('Error fetching products:', error));
  }, []);

  const handleAddToCart = (product) => {
    dispatch(addItemToCart(product));
    setSelectedProduct(null); 
  };

  const openModal = (product) => {
    setSelectedProduct(product);
    setModalVisible(true);
  };

  const closeModal = () => {
    setModalVisible(false);
    setSelectedProduct(null);
  };



  const renderItem = ({ item }) => (
    <View style={styles.itemContainer}>
        <Image source={{ uri: item.image }} style={styles.productImage} resizeMode="contain" />
        <View style={styles.productDetails}>
          <Text style={styles.productName} numberOfLines={2} ellipsizeMode="tail">{item.title}</Text>
          <Text style={styles.productRating}>
            {'⭐'.repeat(Math.round(item.rating.rate))} {item.rating.count}
          </Text>
          <Text style={styles.productPrice}>Rs. {item.price}</Text>
          <Text style={styles.productCategory}>Category: {item.category}</Text>

        {cartItems[item.id] ? (
          <View style={styles.quantityControls}>
            <TouchableOpacity onPress={() => dispatch(decrementQuantity(item.id))}>
              <Text style={styles.quantityButton}>-</Text>
            </TouchableOpacity>
            <Text style={styles.quantityText}>{cartItems[item.id].quantity}</Text>
            <TouchableOpacity onPress={() => dispatch(incrementQuantity(item.id))}>
              <Text style={styles.quantityButton}>+</Text>
            </TouchableOpacity>
          </View>
        ) : (
          <TouchableOpacity onPress={() => setSelectedProduct(item)}>
            <Text style={styles.addToCartButton}>Add to Cart</Text>
          </TouchableOpacity>
        )}
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      <View style={styles.titleContainer}>
        <Text style={styles.title}>Shopping</Text>
      </View>
      <FlatList
        data={products}
        renderItem={renderItem}
        keyExtractor={(item) => item.id.toString()}
        contentContainerStyle={styles.listContent}
      />

      {selectedProduct && (
        <Modal
          animationType="slide"
          transparent={true}
          visible={!!selectedProduct}
          onRequestClose={() => setSelectedProduct(null)}
        >
          <View style={styles.modalContainer}>
            <View style={styles.modalContent}>
              <Image source={{ uri: selectedProduct.image }} style={styles.modalImage} />
              <Text style={styles.modalDescription}>{selectedProduct.description}</Text>
              <TouchableOpacity onPress={() => handleAddToCart(selectedProduct)}>
                <Text style={styles.modalAddToCartButton}>Add To Cart</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={() => setSelectedProduct(null)}>
                <Text style={styles.modalCloseButton}>Close</Text>
              </TouchableOpacity>
            </View>
          </View>
        </Modal>
      )}
    </View>
  );
};


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f0f0f0',
  },
  titleContainer: {
    backgroundColor: '#6200ea',
    padding: 16,
    alignItems: 'center',
  },
  title: {
    fontSize: 24,
    color: '#ffffff',
  },
  listContent: {
    padding: 16,
  },
  itemContainer: {
    backgroundColor: '#ffffff',
    padding: 16,
    marginBottom: 16,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#000000',
    flexDirection: 'row',
  },
  productImage: {
    width: 100,
    height: 100,
    borderRadius: 8,
    marginRight: 25,
    marginTop: 18,
  },
  productDetails: {
    flex: 1,
    justifyContent: 'center',
  },
  productName: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  productPrice: {
    fontSize: 16,
    color: '#888',
    marginBottom: 4,
    marginTop: 8,
  },
  productCategory: {
    fontSize: 14,
    color: '#666',
    marginBottom: 1,
    marginTop: 8,
  },
  productRating: {
    fontSize: 14,
    color: '#444',
    marginTop: 4,
  },
  quantityControls: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  quantityButton: {
    fontSize: 20,
    padding: 8,
    backgroundColor: '#6200ea',
    color: '#fff',
    borderRadius: 4,
  },
  quantityText: {
    fontSize: 16,
    marginHorizontal: 10,
  },
  addToCartButton: {
    marginTop: 10,
    color: '#6200ea',
    fontWeight: 'bold',
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    width: 300,
    padding: 20,
    backgroundColor: '#fff',
    borderRadius: 10,
    alignItems: 'center',
  },
  modalImage: {
    width: 150,
    height: 150,
    marginBottom: 15,
  },
  modalDescription: {
    fontSize: 16,
    marginBottom: 15,
  },
  modalAddToCartButton: {
    fontSize: 18,
    color: '#fff',
    backgroundColor: '#ff6347',
    padding: 10,
    borderRadius: 8,
    marginBottom: 10,
  },
  modalCloseButton: {
    fontSize: 16,
    color: '#6200ea',
  },
});

export default ShoppingScreen;
