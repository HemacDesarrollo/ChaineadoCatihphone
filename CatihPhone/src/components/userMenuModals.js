import { View,Text, TouchableOpacity, Modal, Image, Animated, Dimensions } from "react-native";
import React, {useEffect, useRef} from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import Icon from "react-native-vector-icons/Ionicons";
import { useAuth } from "../hooks/useAuth";
import styles from "../styles/theme/userMenuStyles";
import { useNavigation } from "@react-navigation/native";

export default function UserMenuModal({ visible, onClose, onPerfil, onPassword, onLogout }) {
  const { user } = useAuth();
  const screenWidth = Dimensions.get("window").width;
  const slideAnim = useRef(new Animated.Value(screenWidth)).current;
  const navigation = useNavigation();

   useEffect(() => {
            if (visible) {
                Animated.timing(slideAnim, {
                    toValue: 0,
                    duration: 300,
                    useNativeDriver: true,
                }).start();
            }else {
                Animated.timing(slideAnim, {
                    toValue: screenWidth,
                    duration: 250,
                    useNativeDriver: true,
                }).start();
            }
        }, [visible]);
    

  return (
    <Modal transparent animationType="fade" visible={visible}>
       <View style={styles.overlay}>
        <TouchableOpacity style={styles.backdrop}  onPress={onClose} />
       
      <Animated.View style={[styles.sideMenu, {transform: [{translateX: slideAnim}]}, ]}>
       

          <View style={styles.userSeccion}>
            {user?.foto ? (
              <Image
                source={{ uri: user.foto }}
                style={styles.avatar}
              />
            ) : (
              <View style={styles.avatarFallback}>
                <Text style={styles.initial}>
                  {user?.nombre?.charAt(0)?.toUpperCase() || "U"}
                </Text>
              </View>
            )}

            <Text style={styles.userName}>
              {user?.nombre || "Usuario"}
            </Text>

            <Text style={styles.userEmail}>
              {user?.correo || ""}
            </Text>
          </View>

          <View style={styles.divider} />

          <TouchableOpacity style={styles.option} onPress={() => {onClose(); navigation.navigate("Profile");}}>
            <Icon name="person-outline" size={22} color="#0076A7" />
            <Text style={styles.optionText}>Mi Perfil</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.option} onPress={onPassword}>
            <Icon name="key-outline" size={22} color="#0076A7" />
            <Text style={styles.optionText}>
              Cambiar Contraseña
            </Text>
          </TouchableOpacity>

          <View style={styles.divider} />

          <TouchableOpacity style={styles.logout} onPress={onLogout}>
            <Icon name="log-out-outline" size={22} color="#FF4D4F" />
            <Text style={styles.logoutText}>
              Cerrar Sesión
            </Text>
          </TouchableOpacity>
      </Animated.View>
      </View>
    </Modal>
  );
}
