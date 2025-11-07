import { ScrollView, View } from "react-native"
import { MainLayout } from "../../layouts/MainLayout"
import { StackScreenProps } from "@react-navigation/stack"
import { RootStackParams } from "../../navigation/StackNavigator"
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import { getProjectById } from "../../../actions/projects/get-project-by-id"
import { Datepicker, Input, Layout } from "@ui-kitten/components"
import { CustomButton } from "../../components/ui/CustomButton"
import { CustomIcon } from "../../components/ui/CustomIcon"

import { Formik } from "formik";
import { Project } from "../../../domain/entities/project"
import { updateCreateProject } from "../../../actions/projects/update-create-project"
import { useRef } from "react"
import { useAuthStore } from "../../store/auth/useAuthStore"

interface Props extends StackScreenProps<RootStackParams, 'ProjectScreen'> { };

export const ProjectScreen = ({ route }: Props) => {
    const { user } = useAuthStore();
    const projectIdRef = useRef<number | undefined>(route.params?.projectID);
    const queryClient = useQueryClient();

    const { data: project } = useQuery({
        queryKey: ['project', projectIdRef.current],
        queryFn: () => getProjectById(projectIdRef.current),
        enabled: projectIdRef.current !== undefined,
    });

    const mutation = useMutation({
        mutationFn: (data: Project) => updateCreateProject({ ...data, ProyectoID: projectIdRef.current }),
        onSuccess: (data: Project) => {
            projectIdRef.current = data.ProyectoID;
            queryClient.invalidateQueries({ queryKey: ['projects', user?.UsuarioID] })
            queryClient.invalidateQueries({ queryKey: ['project', data.ProyectoID] })
        },
    })

    if (projectIdRef.current && !project) return <MainLayout title="cargando" />;

    const initialValues = {
        Nombre: project?.Nombre ?? "",
        Descripcion: project?.Descripcion ?? "",
        FechaInicio: project?.FechaInicio ? new Date(project.FechaInicio) : undefined as Date | undefined,
        FechaEntrega: project?.FechaEntrega ? new Date(project.FechaEntrega) : undefined as Date | undefined,
    };

    const fmt = (d?: Date) =>
        d ? d.toLocaleDateString("es-GT", { year: "numeric", month: "2-digit", day: "2-digit" }) : "";

    return (
        <Formik
            enableReinitialize
            initialValues={initialValues}
            onSubmit={mutation.mutate}
        >
            {({ values, handleChange, setFieldValue, handleSubmit }) => {
                const fechaEntregaInvalida =
                    !!values.FechaEntrega &&
                    !!values.FechaInicio &&
                    values.FechaEntrega.getTime() < values.FechaInicio.getTime();

                return (
                    <MainLayout title={project ? project.Nombre : "Nuevo proyecto"}>
                        <ScrollView style={{ flex: 1 }}>
                            <Layout style={{ marginHorizontal: 20, marginTop: 16, marginBottom: 32, padding: 16, borderRadius: 16, elevation: 4 }}>
                                <Input
                                    label="Nombre"
                                    value={values.Nombre}
                                    onChangeText={handleChange("Nombre")}
                                    style={{ marginVertical: 6 }}
                                />

                                <Input
                                    label="Descripción"
                                    value={values.Descripcion}
                                    onChangeText={handleChange("Descripcion")}
                                    style={{ marginVertical: 6 }}
                                    multiline
                                    textStyle={{ minHeight: 100 }}
                                />

                                <Datepicker
                                    label="Fecha de inicio"
                                    date={values.FechaInicio}
                                    onSelect={(d) => setFieldValue("FechaInicio", d as Date)}
                                    placeholder="Selecciona fecha"
                                    accessoryLeft={() => <CustomIcon name="calendar-outline" />}
                                    placement="bottom start"
                                    style={{ marginVertical: 6 }}
                                    min={new Date()}
                                />

                                <Datepicker
                                    label="Fecha de entrega"
                                    date={values.FechaEntrega}
                                    onSelect={(d) => setFieldValue("FechaEntrega", d as Date)}
                                    placeholder="Selecciona fecha"
                                    accessoryLeft={() => <CustomIcon name="calendar-outline" />}
                                    placement="bottom start"
                                    style={{ marginVertical: 6 }}
                                    min={values.FechaInicio}
                                    status={fechaEntregaInvalida ? "danger" : "basic"}
                                    caption={
                                        fechaEntregaInvalida
                                            ? "La fecha de entrega no puede ser anterior a la de inicio."
                                            : fmt(values.FechaEntrega)
                                    }
                                />

                                <View style={{ height: 12 }} />

                                <CustomButton
                                    label={projectIdRef.current ? "Guardar cambios" : "Crear proyecto"}
                                    onPress={() => handleSubmit()}
                                    disabled={mutation.isPending}
                                />

                            </Layout>
                        </ScrollView>
                    </MainLayout>
                );
            }}
        </Formik>
    );
};
