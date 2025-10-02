import React, { useEffect, useState } from 'react';
import { View, Text, Button } from 'react-native';
import api from '../api/client';

export default function ProductDetails({ route, navigation }) {
  const { id } = route.params;
  const [p, setP] = useState(null);

  useEffect(()=>{ api.get('/products/' + id).then(r=>setP(r.data)); },[id]);

  if(!p) return <View><Text>Loading...</Text></View>;

  return (
    <View style={{padding:12}}>
      <Text style={{fontSize:20}}>{p.title}</Text>
      <Text>{p.description}</Text>
      <Text>Price: ₦{(p.price/100).toFixed(2)}</Text>
      <Button title="Add to Cart" onPress={async ()=>{
        await api.post('/cart/add', { userId: 'user-1', productId: p.id, qty: 1 });
        navigation.navigate('Cart');
      }} />
    </View>
  );
}
