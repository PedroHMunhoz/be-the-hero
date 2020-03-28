import React, { useState, useEffect } from "react";
import { Feather } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { View, FlatList, Image, Text, TouchableOpacity } from "react-native";
import api from "../../services/api";
import logoImg from "../../assets/logo.png";
import styles from "./styles";

export default function Incidents() {
  const [incidents, setIncidents] = useState([]);
  const [total, setTotal] = useState(0);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const navigation = useNavigation();

  function navigateToDetail(incident) {
    navigation.navigate("Detail", { incident });
  }

  async function loadIncidents() {
    //Se já estiver carregando, não deixa chamar outra requisição para a API
    if (loading) {
      return;
    }

    //Se o total de incidents listados for igual ao total já buscado, não faz nova requisição pois não há mais nada pra paginar
    if (total > 0 && incidents.length == total) {
      return;
    }

    //Seta o loading pra true, indicando que está carregando a lista
    setLoading(true);

    //Busca os incidents da API usando o método GET
    //Passando a page atual como parâmetro, pra fazer a paginação
    const response = await api.get("incidents", {
      params: { page }
    });

    setIncidents([...incidents, ...response.data]); //Copia todos os valores já existentes em incidents e todos os valores do response.data, anexando
    setTotal(response.headers["x-total-count"]); //Pega o total enviado pelo header do backend da API

    //Incrementa a página ao finalizar o load
    setPage(page + 1);

    //Seta o loading pra false, pq terminou de carregar
    setLoading(false);
  }

  useEffect(() => {
    loadIncidents();
  }, []);

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Image source={logoImg} />
        <Text style={styles.headerText}>
          Total de <Text style={styles.headerTextBold}> {total} casos</Text>.
        </Text>
      </View>
      <Text style={styles.title}>Bem-vindo!</Text>
      <Text style={styles.description}>
        Escolha um dos casos abaixo e salve o dia!
      </Text>

      <FlatList
        style={styles.incidentList}
        data={incidents}
        keyExtractor={incident => String(incident.id)}
        showsVerticalScrollIndicator={false}
        onEndReached={loadIncidents}
        onEndReachedThreshold={0.2}
        renderItem={({ item: incident }) => (
          <View style={styles.incident}>
            <Text style={styles.incidentProperty}>ONG:</Text>
            <Text style={styles.incidentValue}>{incident.name}</Text>

            <Text style={styles.incidentProperty}>Caso:</Text>
            <Text style={styles.incidentValue}>{incident.title}</Text>

            <Text style={styles.incidentProperty}>Valor:</Text>
            <Text style={styles.incidentValue}>
              {Intl.NumberFormat("pt-BR", {
                style: "currency",
                currency: "BRL"
              }).format(incident.value)}
            </Text>
            <TouchableOpacity
              style={styles.detailsButton}
              onPress={() => navigateToDetail(incident)}
            >
              <Text style={styles.detailsButtonText}>Ver mais detalhes</Text>
              <Feather name="arrow-right" size={16} color="#E02041"></Feather>
            </TouchableOpacity>
          </View>
        )}
      />
    </View>
  );
}
