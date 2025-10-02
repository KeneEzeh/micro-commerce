import React, { useEffect, useState } from 'react';
import { View, Text, Button, FlatList } from 'react-native';
import api from '../api/client';

export default function CartScreen() {
  const [items, setItems] = useState([]);
  useEffect(()=>{ fetch(); },[]);
  async function fetch(){ const r = await api.get('/cart', { params: { userId: 'user-1' } }); setItems(r.data); }
  return (
    <View style={{flex:1, padding:12}}>
      <FlatList data={items} keyExtractor={i=>i.id} renderItem={({item})=>(
        <View style={{padding:10, borderBottomWidth:1}}>
          <Text>{item.product.title} x {item.quantity}</Text>
        </View>
      )} />
      <Button title="Checkout (mock)" onPress={async ()=>{
        const itemsForOrder = items.map(i=>({ productId: i.product.id, qty: i.quantity }));
        await api.post('/orders', { userId: 'user-1', items: itemsForOrder });
        alert('Order placed (mock)');
      }} />
    </View>
  );
}
