import { ScrollView, View } from "react-native"
import { MainLayout } from "../../layouts/MainLayout"
import { StackScreenProps } from "@react-navigation/stack"
import { RootStackParams } from "../../navigation/StackNavigator"
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import { getProjectById } from "../../../actions/projects/get-project-by-id"
import { Datepicker, IndexPath, Input, Layout, Select, SelectItem } from "@ui-kitten/components"
import { CustomButton } from "../../components/ui/CustomButton"
import { CustomIcon } from "../../components/ui/CustomIcon"

import { Formik } from "formik";
import { Project } from "../../../domain/entities/project"
import { updateCreateProject } from "../../../actions/projects/update-create-project"
import { useMemo, useRef } from "react"
import { useAuthStore } from "../../store/auth/useAuthStore"
import { getUsers } from "../../../actions/users/get-users"

interface Props extends StackScreenProps<RootStackParams, 'ProjectScreen'> { };

type Option = { id: number; label: string };
type UserRow = { UsuarioID: number; Nombre: string };

export const ProjectScreen = ({ route }: Props) => {
    const { user } = useAuthStore();
    const projectIdRef = useRef<number | undefined>(route.params?.projectID);
    const queryClient = useQueryClient();
    let disabled = false;


    const { data: project } = useQuery({
        queryKey: ['project', projectIdRef.current],
        queryFn: () => getProjectById(projectIdRef.current),
        enabled: projectIdRef.current !== undefined,
    });

    const { data: usersRaw = [] as UserRow[] } = useQuery<UserRow[]>({
        queryKey: ["users", "all"],
        queryFn: getUsers,
    });

    const users: Option[] = useMemo(
        () => usersRaw.map(u => ({ id: Number(u.UsuarioID), label: String(u.Nombre).trim() })),
        [usersRaw]
    );

    const mutation = useMutation({
        mutationFn: (data: Project) => updateCreateProject({ ...data, ProyectoID: projectIdRef.current }),
        onSuccess: (data: Project) => {
            projectIdRef.current = data.ProyectoID;
            queryClient.invalidateQueries({ queryKey: ['projects', user?.UsuarioID] })
            queryClient.invalidateQueries({ queryKey: ['project', data.ProyectoID] })
        },
    })

    const idsToIndexPaths = (ids: number[], options: Option[]) =>
        ids
            .map(id => new IndexPath(options.findIndex(o => o.id === id)))
            .filter(ip => ip.row >= 0);


    const indexPathsToIds = (index: IndexPath | IndexPath[], options: Option[]) => {
        const arr = Array.isArray(index) ? index : [index];
        return arr.map(ip => options[ip.row]?.id).filter(Boolean) as number[];
    };

    const initialValues = {
        Nombre: project?.Nombre ?? "",
        Descripcion: project?.Descripcion ?? "",
        FechaInicio: project?.FechaInicio ? new Date(project.FechaInicio) : undefined as Date | undefined,
        FechaEntrega: project?.FechaEntrega ? new Date(project.FechaEntrega) : undefined as Date | undefined,
        MiembrosUsuarioIDs: project?.MiembrosUsuarioIDs ?? [],
    };

    const fmt = (d?: Date) =>
        d ? d.toLocaleDateString("es-GT", { year: "numeric", month: "2-digit", day: "2-digit" }) : "";

    if (projectIdRef.current !== undefined) {
        disabled = user?.UsuarioID !== project?.UsuarioCreadorID;
    }

    console.log("disabled: ", disabled)

    if (projectIdRef.current && !project) return <MainLayout title="cargando" />;

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
                                    disabled={disabled}
                                />

                                <Input
                                    label="Descripción"
                                    value={values.Descripcion}
                                    onChangeText={handleChange("Descripcion")}
                                    style={{ marginVertical: 6 }}
                                    multiline
                                    textStyle={{ minHeight: 100 }}
                                    disabled={disabled}
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
                                    disabled={disabled}
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
                                    disabled={disabled}
                                    caption={
                                        fechaEntregaInvalida
                                            ? "La fecha de entrega no puede ser anterior a la de inicio."
                                            : fmt(values.FechaEntrega)
                                    }
                                />
                                <Select
                                    label="Miembros del proyecto"
                                    multiSelect
                                    selectedIndex={idsToIndexPaths(values.MiembrosUsuarioIDs, users)}
                                    onSelect={(index) => {
                                        const ids = indexPathsToIds(index, users);
                                        setFieldValue("MiembrosUsuarioIDs", ids);
                                    }}
                                    placeholder="Selecciona miembros"
                                    accessoryLeft={() => <CustomIcon name="people-outline" />}
                                    style={{ marginVertical: 6 }}
                                    value={
                                        (() => {
                                            const labels = (values.MiembrosUsuarioIDs ?? [])
                                                .map((id: number) => users.find(u => u.id === id)?.label)
                                                .filter(Boolean) as string[];
                                            return labels.length ? labels.join(", ") : "—";
                                        })()
                                    }
                                    disabled={disabled}
                                >
                                    {users.map(u => (
                                        <SelectItem key={u.id} title={u.label} />
                                    ))}
                                </Select>

                                <View style={{ height: 12 }} />

                                {
                                    !disabled && <CustomButton
                                        label={projectIdRef.current ? "Guardar cambios" : "Crear proyecto"}
                                        onPress={() => handleSubmit()}
                                        disabled={mutation.isPending}
                                    />
                                }

                            </Layout>
                        </ScrollView>
                    </MainLayout>
                );
            }}
        </Formik>
    );
};
