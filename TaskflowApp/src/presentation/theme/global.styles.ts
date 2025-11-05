import { StyleSheet } from "react-native";

export const globalColors = {
    primary: '#6C63FF',      // Azul violeta acento - botones principales, logo
    secondary: '#3A0CA3',    // Púrpura profundo - headers, fondos secundarios
    accent: '#FF5D8F',       // Rosa acento - botones de acción o enlaces destacados
    highlight: '#48CAE4',    // Cyan suave - íconos, detalles interactivos
    success: '#2ECC71',      // Verde éxito - tareas completadas
    warning: '#F1C40F',      // Amarillo advertencia - tareas en progreso
    danger: '#E74C3C',       // Rojo alerta - errores o bloqueos
    textPrimary: '#1E1E1E',  // Texto principal oscuro
    textSecondary: '#F4F6F8',// Texto secundario o labels
    border: '#E0E0E0',       // Líneas y bordes suaves
    background: '#FFFFFF',   // Fondo principal blanco
    gradientStart: '#3A0CA3',// Gradiente inicial (púrpura)
    gradientEnd: '#6C63FF',  // Gradiente final (azul violeta)
};

export const globalStyles = StyleSheet.create({
    container: {
        flex: 1,
        paddingHorizontal: 28,
        backgroundColor: globalColors.secondary
    },
    containerCenter: {
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: 10
    },
    header: {
        alignItems: 'center',
        marginBottom: 24,
    },
    logo: {
        width: 320,
        height: 320,
    },
    mainTitle: {
        fontSize: 80,
        fontWeight: '700',
        marginBottom: 6,
        color: globalColors.textSecondary
    },
    mainSubtitle: {
        fontSize: 20,
        fontWeight: '300',
        color: globalColors.textSecondary
    },
    mainButton: {
        width: '100%',
        height: 60,
        borderRadius: 10,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: globalColors.accent,
        marginBottom: 10,
    },
    mainButtonText: {
        color: globalColors.textSecondary,
        fontSize: 25,
        fontWeight: '500',
    },
    mainInput: {
        height: 60,
        borderRadius: 12,
    },
    containerHeader: {
        backgroundColor: globalColors.secondary
    },
    containerCardContent: {
        backgroundColor: globalColors.textSecondary,
        borderRadius: 25,
        marginTop: -24, 
        zIndex: 10,
        elevation: 8,
        shadowColor: globalColors.textPrimary,
        shadowOpacity: 0.12,
        shadowRadius: 12,
        shadowOffset: { width: 0, height: 6 },
    },
})