import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, Button, TouchableOpacity } from 'react-native';
import api from '../api/client';

export default function ProductList({ navigation }) {
  const [products, setProducts] = useState([]);

  useEffect(()=>{ fetchProducts(); },[]);

  async function fetchProducts() {
    try {
      const res = await api.get('/products');
      setProducts(res.data.data || res.data);
    } catch(e){ console.log(e); }
  }

  return (
    <View style={{flex:1, padding:12}}>
      <Button title="Go to Cart" onPress={()=>navigation.navigate('Cart')} />
      <FlatList data={products} keyExtractor={p=>p.id} renderItem={({item})=>(
        <TouchableOpacity onPress={()=>navigation.navigate('Details',{id:item.id})}>
          <View style={{padding:10, borderBottomWidth:1}}>
            <Text style={{fontSize:16}}>{item.title} — ₦{(item.price/100).toFixed(2)}</Text>
            <Text>{item.description}</Text>
          </View>
        </TouchableOpacity>
      )} />
    </View>
  );
}
