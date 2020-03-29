import React,{useEffect,useState} from 'react';
import {Feather} from '@expo/vector-icons';
import {useNavigation} from '@react-navigation/native'
import {View, FlatList,Image, Text, TouchableOpacity} from 'react-native';


import LogoImg from '../../assets/logo.png';
import styles from './styles';
import api from '../../services/api';

export default function Incidents(){

    const  navigation = useNavigation();
    const [incidents,setIncidents] = useState([]);
    const [total,setTotal] = useState(0);
    const [page,setPage] = useState(1);
    const [loading,setLoading] = useState(false);

    function navigationToDetail(incident){
        navigation.navigate('Detail',{incident});
    }

    async function loaderIncidents(){

        if(loading){
            return;
        }

        if(total > 0 && incidents.length === total){
            return;
        }

        setLoading(true);

        const response = await api.get('incedents',{
            params:{page}
        });

        setIncidents([...incidents,...response.data]);
        setTotal(response.headers['x-total-count']);

        setPage(page + 1);
        setLoading(false);
    }

    useEffect(()=>{
        loaderIncidents();
    },[]);

    return(
        <View style={styles.container}>

            <View style={styles.header}>
                <Image source={LogoImg}/>
            
                <Text style={styles.headerText}>
                    total de <Text style={styles.headerTextBold}>{total} casos.</Text>
                </Text>
            </View>

            <Text style={styles.title}>Bem-vindo!</Text>
            <Text style={styles.description}>Escolha um dos casos abaixo e salve o dia.</Text>


            <FlatList 
                style={styles.incidentsList}
                data={incidents}
                keyExtractor={incident => String(incident.id)}
                onEndReached={loaderIncidents}
                onEndReachedThreshold={0.2}
                showsVerticalScrollIndicator={false}
                renderItem={({item:incident})=>(

                <View style={styles.incidents}>
                    <Text style={styles.incidentsProperty}>ONG:</Text>
                    <Text style={styles.incidentsValue}>{incident.name}</Text>

                    <Text style={styles.incidentsProperty}>CASO:</Text>
                    <Text style={styles.incidentsValue}>{incident.title}</Text>

                    <Text style={styles.incidentsProperty}>VALOR:</Text>
                    <Text style={styles.incidentsValue}>
                        {
                            Intl.NumberFormat('pt-BR',{style: 'currency',currency: 'BRL'}).format(incident.value)
                        }
                    </Text>

                    <TouchableOpacity 
                        style={styles.detailsButton}
                        onPress={() => navigationToDetail(incident)}>

                        <Text style={styles.detailsButtonText}>Ver mais detalhes</Text>
                        
                        <Feather name="arrow-right" size={16} color="#E02041"/>
                    </TouchableOpacity>
                </View>
                )}
            />

        </View>
    );
}