import { StyleSheet } from "react-native";

export const globalColors = {
    primary: '#6C63FF',
    secondary: '#3A0CA3',
    accent: '#FF5D8F',
    highlight: '#48CAE4',
    success: '#2ECC71',
    warning: '#F1C40F',
    danger: '#E74C3C',
    textPrimary: '#1E1E1E',
    textSecondary: '#F4F6F8',
    border: '#E0E0E0',
    background: '#FFFFFF',
    backgroundSecondary: '#00000010',
    gradientStart: '#3A0CA3',
    gradientEnd: '#6C63FF',
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
        height: 60,
        borderRadius: 10,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: globalColors.accent,
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
        backgroundColor: globalColors.gradientStart
    },
    containerCardContent: {
        flex: 1,
        padding: 10,
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
    cardEmptyList: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        paddingHorizontal: 24,
        gap: 8,
    },
    iconEmptyList: {
        width: 80,
        height: 80,
        borderRadius: 40,
        backgroundColor: globalColors.backgroundSecondary,
        alignItems: 'center',
        justifyContent: 'center',
    },
    profileCard: {
        width: "100%",
        padding: 20,
        borderRadius: 16,
        elevation: 3,
        shadowColor: "#000",
        shadowOpacity: 0.12,
        shadowRadius: 8,
        gap: 16,
    },
    profileAvatar: {
        width: 96,
        height: 96,
        borderRadius: 48,
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: globalColors.border
    }
})