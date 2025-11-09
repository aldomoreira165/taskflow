import React from "react";
import { View } from "react-native";
import { useQueryClient } from '@tanstack/react-query';
import { Header } from "../../components/ui/Header";
import { CardContent } from "../../components/ui/CardContent";
import { CustomButton } from "../../components/ui/CustomButton";
import { useAuthStore } from "../../store/auth/useAuthStore";
import { Layout, Text, Divider, useTheme } from "@ui-kitten/components";
import { globalColors, globalStyles } from "../../theme/global.styles";
import { CustomIcon } from "../../components/ui/CustomIcon";

export const ProfileScreen = () => {
  const { user, logout } = useAuthStore();
  const theme = useTheme();
  const queryClient = useQueryClient();

  const logoutCache = async () => {
    await logout();
    queryClient.clear();
  }

  return (
    <View style={{ flex: 1, backgroundColor: globalColors.secondary }}>
      <Header />

      <CardContent>
        <Layout
          style={globalStyles.profileCard}
        >
          <View style={{ alignItems: "center", gap: 10 }}>
            <View
              style={globalStyles.profileAvatar}
            >
              <CustomIcon
                name="person-outline"
                style={{ width: 56, height: 56 }}
                fill={theme["color-basic-100"]}
              />
            </View>

            <Text category="h5" style={{ textAlign: "center" }}>
              {user?.Nombre ?? "Empleado"}
            </Text>
            <Text appearance="hint" category="c1">
              ID: {user?.UsuarioID ?? "—"}
            </Text>
          </View>

          <Divider />

          <View style={{ gap: 12 }}>
            <InfoRow label="Usuario" value={user?.Usuario ?? "—"} />
            <InfoRow label="Nombre" value={user?.Nombre ?? "—"} />
          </View>

          <CustomButton
            label="Cerrar sesión"
            onPress={logoutCache}
            style={{
              marginTop: 16,
              backgroundColor: globalColors.danger,
              width: "100%",
            }}
          />
        </Layout>

      </CardContent>
    </View>
  );
};

const InfoRow = ({ label, value }: { label: string; value?: string }) => {
  return (
    <View
      style={{
        width: "100%",
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        gap: 12,
      }}
    >
      <Text appearance="hint">{label}</Text>
      <Text numberOfLines={1} style={{ flex: 1, textAlign: "right" }}>
        {value ?? "—"}
      </Text>
    </View>
  );
};
