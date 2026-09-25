
import React, {useState} from "react";
import {SafeAreaView, View, Text, TextInput, Pressable, ScrollView, StyleSheet, Alert} from "react-native";

const plans=[
 {id:1,name:"প্ল্যান ১",days:"১০০ দিন",price:"৳৫৫০",daily:"৳৮"},
 {id:2,name:"প্ল্যান ২",days:"১০০ দিন",price:"৳১,২০০",daily:"৳১৯০"},
 {id:3,name:"প্ল্যান ৩",days:"১০০ দিন",price:"৳২,৫০০",daily:"৳৩৫০"},
];

export default function App(){
 const [screen,setScreen]=useState("home");
 const [balance,setBalance]=useState(210);
 const [provider,setProvider]=useState("bKash");
 const [amount,setAmount]=useState("");
 const [phone,setPhone]=useState("017XXXXXXXX");
 const [trx,setTrx]=useState("");

 const nav=(s)=>setScreen(s);
 const info=(title,msg="এই ফিচারটি API ও server সংযোগের পরে চালু হবে।")=>Alert.alert(title,msg);

 return <SafeAreaView style={s.safe}>
   <View style={s.top}><Text style={s.brand}>BD Pay</Text><Text style={s.topTitle}>{titleFor(screen)}</Text></View>

   {screen==="home" && <Home balance={balance} nav={nav} buy={(p)=>info("প্ল্যান",`আপনি ${p.name} নির্বাচন করেছেন। পেমেন্ট পেজে bKash/Nagad নেওয়া হবে।`)}/>}
   {screen==="deposit" && <Payment title="রিচার্জ / ডিপোজিট" provider={provider} setProvider={setProvider} amount={amount} setAmount={setAmount} phone={phone} setPhone={setPhone} trx={trx} setTrx={setTrx} onSubmit={()=>info("ডিপোজিট","Server-side bKash/Nagad verification-এর পরে ব্যালেন্স যোগ হবে।")}/>}
   {screen==="withdraw" && <Withdraw balance={balance} provider={provider} setProvider={setProvider} amount={amount} setAmount={setAmount} phone={phone} setPhone={setPhone} onSubmit={()=>info("উত্তোলন","Server-side verification ও admin rules প্রয়োগ করে withdrawal process হবে।")}/>}
   {screen==="share" && <Share info={info}/>}
   {screen==="work" && <Work info={info}/>}
   {screen==="me" && <Profile phone={phone} info={info}/>}
   {screen==="income" && <Income info={info}/>}

   <View style={s.nav}>
    {[
      ["home","⌂","হোম"],["income","◉","আয়"],["share","➜","শেয়ার"],["work","▣","কাজ"],["me","♙","আমার"]
    ].map(([k,i,t])=><Pressable key={k} style={s.navItem} onPress={()=>nav(k)}>
      <Text style={[s.navIcon,screen===k&&s.active]}>{i}</Text><Text style={screen===k?s.active:s.navText}>{t}</Text>
    </Pressable>)}
   </View>
 </SafeAreaView>
}

function titleFor(x){return {home:"ড্যাশবোর্ড",income:"আয়",share:"শেয়ার",work:"কাজ",me:"আমার",deposit:"রিচার্জ",withdraw:"উত্তোলন"}[x]||"BD Pay"}

function Home({balance,nav,buy}){
 return <ScrollView contentContainerStyle={s.content}>
  <View style={s.hero}><Text style={s.heroBrand}>BD Pay</Text><Text style={s.heroSub}>ডিজিটাল ব্যবসা ও পেমেন্ট ব্যবস্থাপনা</Text></View>
  <View style={s.quick}>
   <Q icon="▣" text="রিচার্জ" onPress={()=>nav("deposit")}/>
   <Q icon="▱" text="উত্তোলন" onPress={()=>nav("withdraw")}/>
   <Q icon="▤" text="সাবস্ক্রিপশন" onPress={()=>nav("work")}/>
   <Q icon="◉" text="সেবা" onPress={()=>nav("me")}/>
  </View>
  <View style={s.balance}><Text>বর্তমান ব্যালেন্স</Text><Text style={s.balanceNum}>৳ {balance}</Text></View>
  <Text style={s.heading}>ব্যবসার পরিকল্পনা</Text>
  {plans.map(p=><View style={s.plan} key={p.id}>
    <View style={{flex:1}}><Text style={s.planName}>{p.name}</Text><Text>{p.days}</Text><Text style={s.muted}>দৈনিক আয়: {p.daily}</Text></View>
    <View style={{alignItems:"flex-end"}}><Text style={s.price}>{p.price}</Text><Pressable style={s.button} onPress={()=>buy(p)}><Text style={s.buttonText}>এখন পেমেন্ট করুন</Text></Pressable></View>
  </View>)}
 </ScrollView>
}
function Q({icon,text,onPress}){return <Pressable style={s.q} onPress={onPress}><Text style={s.qIcon}>{icon}</Text><Text>{text}</Text></Pressable>}

function Payment({title,provider,setProvider,amount,setAmount,phone,setPhone,trx,setTrx,onSubmit}){
 return <ScrollView contentContainerStyle={s.content}>
  <Text style={s.big}>{title}</Text>
  <View style={s.card}><Text style={s.label}>পেমেন্ট মাধ্যম</Text>
   <View style={s.providers}>
    <Pressable onPress={()=>setProvider("bKash")} style={[s.provider,provider==="bKash"&&s.selected]}><Text>bKash</Text></Pressable>
    <Pressable onPress={()=>setProvider("Nagad")} style={[s.provider,provider==="Nagad"&&s.selected]}><Text>Nagad</Text></Pressable>
   </View>
   <TextInput style={s.input} placeholder="টাকার পরিমাণ" keyboardType="numeric" value={amount} onChangeText={setAmount}/>
   <TextInput style={s.input} placeholder="পেমেন্ট করা মোবাইল নম্বর" keyboardType="phone-pad" value={phone} onChangeText={setPhone}/>
   <TextInput style={s.input} placeholder="TrxID" value={trx} onChangeText={setTrx}/>
   <Pressable style={s.fullButton} onPress={onSubmit}><Text style={s.buttonText}>পেমেন্ট সাবমিট করুন</Text></Pressable>
   <Text style={s.note}>বাস্তব টাকা লেনদেনের ক্ষেত্রে provider API/webhook ও server-side verification ছাড়া balance update হবে না।</Text>
  </View>
 </ScrollView>
}

function Withdraw({balance,provider,setProvider,amount,setAmount,phone,setPhone,onSubmit}){
 return <ScrollView contentContainerStyle={s.content}>
  <Text style={s.big}>উত্তোলন</Text>
  <View style={s.card}><Text>উপলব্ধ ব্যালেন্স: ৳ {balance}</Text>
   <View style={s.providers}><Pressable onPress={()=>setProvider("bKash")} style={[s.provider,provider==="bKash"&&s.selected]}><Text>bKash</Text></Pressable><Pressable onPress={()=>setProvider("Nagad")} style={[s.provider,provider==="Nagad"&&s.selected]}><Text>Nagad</Text></Pressable></View>
   <TextInput style={s.input} placeholder="উত্তোলনের পরিমাণ" keyboardType="numeric" value={amount} onChangeText={setAmount}/>
   <TextInput style={s.input} placeholder="bKash/Nagad নম্বর" keyboardType="phone-pad" value={phone} onChangeText={setPhone}/>
   <Pressable style={s.fullButton} onPress={onSubmit}><Text style={s.buttonText}>উত্তোলনের আবেদন</Text></Pressable>
  </View>
 </ScrollView>
}

function Share({info}){return <ScrollView contentContainerStyle={s.content}>
 <View style={s.card}><Text style={s.heading}>আমার আমন্ত্রণ কোড</Text><Text style={s.ref}>BDP-73F4D133</Text><Pressable style={s.button} onPress={()=>info("কপি","Referral link কপি হবে।")}><Text style={s.buttonText}>লিংক কপি</Text></Pressable></View>
 <View style={s.card}><Text style={s.heading}>আমার দল</Text>{["LV1","LV2","LV3"].map((x,i)=><View style={s.row} key={x}><Text>{x}</Text><Text>{[25,2,1][i]}% কমিশন · সদস্য 0 · মোট ৳0.00</Text></View>)}</View>
 </ScrollView>}

function Work({info}){return <ScrollView contentContainerStyle={s.content}>
 {["ব্যালেন্স রেকর্ড","লেনদেন","রিচার্জ রেকর্ড","উত্তোলন রেকর্ড","আমার দল","ডাউনলোড","লগআউট"].map(x=><Pressable style={s.menu} key={x} onPress={()=>info(x)}><Text>{x}</Text><Text>›</Text></Pressable>)}
 </ScrollView>}

function Income({info}){return <ScrollView contentContainerStyle={s.content}>
 <View style={s.balance}><Text>আজকের আয়</Text><Text style={s.balanceNum}>৳ 0.00</Text></View>
 {["দৈনিক আয়","কমিশন আয়","রেফারেল আয়","মোট আয়"].map(x=><Pressable style={s.menu} key={x} onPress={()=>info(x)}><Text>{x}</Text><Text>৳ 0.00 ›</Text></Pressable>)}
 </ScrollView>}

function Profile({phone,info}){return <ScrollView contentContainerStyle={s.content}>
 <View style={s.profile}><Text style={s.avatar}>BD</Text><Text style={s.name}>BD Pay User</Text><Text>{phone}</Text></View>
 {["প্রোফাইল","পাসওয়ার্ড পরিবর্তন","নিরাপত্তা","সাপোর্ট","লগআউট"].map(x=><Pressable style={s.menu} key={x} onPress={()=>info(x)}><Text>{x}</Text><Text>›</Text></Pressable>)}
 </ScrollView>}

const s=StyleSheet.create({
safe:{flex:1,backgroundColor:"#f4f4f4"},top:{height:58,backgroundColor:"#35336c",flexDirection:"row",alignItems:"center",paddingHorizontal:18},brand:{fontSize:24,fontWeight:"900",color:"#fff"},topTitle:{fontSize:17,color:"#fff",marginLeft:16},content:{padding:16,paddingBottom:100},hero:{backgroundColor:"#35336c",borderRadius:18,padding:25,marginBottom:14},heroBrand:{fontSize:30,fontWeight:"900",color:"#fff"},heroSub:{color:"#eee",marginTop:5},quick:{backgroundColor:"#fff",borderRadius:16,padding:12,flexDirection:"row",justifyContent:"space-between"},q:{width:"24%",alignItems:"center"},qIcon:{fontSize:27,color:"#35336c"},balance:{backgroundColor:"#fff",borderRadius:16,padding:18,marginTop:14,marginBottom:18},balanceNum:{fontSize:30,fontWeight:"900",marginTop:5},heading:{fontSize:21,fontWeight:"800",marginBottom:10},plan:{backgroundColor:"#fff",borderRadius:16,padding:16,marginBottom:12,flexDirection:"row"},planName:{fontSize:20,fontWeight:"800"},muted:{color:"#777",marginTop:6},price:{fontSize:23,fontWeight:"900"},button:{backgroundColor:"#35336c",paddingHorizontal:17,paddingVertical:10,borderRadius:24,marginTop:10},buttonText:{color:"#fff",fontWeight:"800"},big:{fontSize:27,fontWeight:"900",marginBottom:14},card:{backgroundColor:"#fff",borderRadius:16,padding:18,marginBottom:14},label:{fontWeight:"700"},providers:{flexDirection:"row",gap:10,marginVertical:14},provider:{flex:1,padding:14,borderWidth:1,borderColor:"#ccc",borderRadius:12,alignItems:"center"},selected:{backgroundColor:"#ecebff",borderColor:"#35336c"},input:{borderWidth:1,borderColor:"#ddd",borderRadius:12,padding:14,marginBottom:10,backgroundColor:"#fafafa"},fullButton:{backgroundColor:"#35336c",padding:15,borderRadius:26,alignItems:"center"},note:{color:"#777",marginTop:14,lineHeight:20},ref:{fontSize:22,fontWeight:"900",marginVertical:10},row:{paddingVertical:15,borderBottomWidth:1,borderBottomColor:"#eee"},menu:{backgroundColor:"#fff",borderRadius:14,padding:19,marginBottom:10,flexDirection:"row",justifyContent:"space-between"},profile:{backgroundColor:"#fff",borderRadius:18,alignItems:"center",padding:28,marginBottom:14},avatar:{backgroundColor:"#35336c",color:"#fff",width:80,height:80,borderRadius:40,textAlign:"center",paddingTop:25,fontSize:25,fontWeight:"900"},name:{fontSize:22,fontWeight:"900",marginTop:12},nav:{position:"absolute",bottom:0,left:0,right:0,height:72,backgroundColor:"#fff",borderTopWidth:1,borderTopColor:"#ddd",flexDirection:"row",justifyContent:"space-around"},navItem:{alignItems:"center",paddingTop:7},navIcon:{fontSize:26,color:"#666"},navText:{color:"#666"},active:{color:"#35336c",fontWeight:"900"}
});
