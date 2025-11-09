import { ScrollView, View } from "react-native";
import { MainLayout } from "../../layouts/MainLayout";
import { StackScreenProps } from "@react-navigation/stack";
import { RootStackParams } from "../../navigation/StackNavigator";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { Datepicker, Input, Layout, Select, SelectItem, IndexPath } from "@ui-kitten/components";
import { CustomButton } from "../../components/ui/CustomButton";
import { CustomIcon } from "../../components/ui/CustomIcon";

import { Formik } from "formik";
import { useRef, useMemo, useState } from "react";
import { useAuthStore } from "../../store/auth/useAuthStore";

import { Task } from "../../../domain/entities/task";
import { getTaskById } from "../../../actions/tasks/get-task-by-id";
import { updateCreateTask } from "../../../actions/tasks/update-create-task";
import { getUsers } from "../../../actions/users/get-users";
import { getPriorities } from "../../../actions/tasks/get-priorities";
import { getStatuses } from "../../../actions/tasks/get-statuses";
import { getCategories } from "../../../actions/tasks/get-categories";
import { getAllProjects } from "../../../actions/projects/get-projects";


interface Props extends StackScreenProps<RootStackParams, "TaskScreen"> { }

type Option = { id: number; label: string };

const fmt = (d?: Date) =>
  d ? d.toLocaleDateString("es-GT", { year: "numeric", month: "2-digit", day: "2-digit" }) : "";

const idToIndexPath = (id: number | undefined, options: Option[]) => {
  if (id == null) return undefined;
  const idx = options.findIndex(o => o.id === id);
  return idx >= 0 ? new IndexPath(idx) : undefined;
};

export const TaskScreen = ({ route }: Props) => {
  const { user } = useAuthStore();
  const tareaIdRef = useRef<number | undefined>(route.params?.taskID);
  const queryClient = useQueryClient();

  const { data: users = [] as Option[] } = useQuery<Option[]>({
    queryKey: ["users", "all"],
    queryFn: getUsers,
  });
  const { data: priorities = [] as Option[] } = useQuery<Option[]>({
    queryKey: ["tasks", "priorities"],
    queryFn: getPriorities,
  });
  const { data: statuses = [] as Option[] } = useQuery<Option[]>({
    queryKey: ["tasks", "statuses"],
    queryFn: getStatuses,
  });
  const { data: categories = [] as Option[] } = useQuery<Option[]>({
    queryKey: ["tasks", "categories"],
    queryFn: getCategories,
  });
  const { data: projects = [] as Option[] } = useQuery<Option[]>({
    queryKey: ["projects", "all"],
    queryFn: getAllProjects,
  });
  const { data: task } = useQuery({
    queryKey: ["task", tareaIdRef.current],
    queryFn: () => getTaskById(tareaIdRef.current),
    enabled: tareaIdRef.current !== undefined,
  });

  const mutation = useMutation({
    mutationFn: (data: Task) => updateCreateTask({ ...data, TareaID: tareaIdRef.current }),
    onSuccess: (saved: Task) => {
      tareaIdRef.current = saved.TareaID;
      queryClient.invalidateQueries({ queryKey: ["tasks", user?.UsuarioID] });
      queryClient.invalidateQueries({ queryKey: ["task", saved.TareaID] });
      queryClient.invalidateQueries({ queryKey: ["projects", user?.UsuarioID] });
    },
  });

  const initialValues = {
    Nombre: task?.Nombre ?? "",
    Descripcion: task?.Descripcion ?? "",
    FechaInicio: task?.FechaInicio ? new Date(task.FechaInicio) : undefined as Date | undefined,
    FechaEntrega: task?.FechaEntrega ? new Date(task.FechaEntrega) : undefined as Date | undefined,
    ProyectoID: task?.ProyectoID ?? (route.params as any)?.ProyectoID ?? undefined,
    PrioridadID: task?.PrioridadID ?? undefined,
    EstadoID: task?.EstadoID ?? undefined,
    UsuarioAsignadoID: task?.UsuarioAsignadoID ?? undefined,
    CategoriaID: task?.CategoriaID ?? undefined,
  };

  const initialSelects = useMemo(() => {
    return {
      prioridad: idToIndexPath(initialValues.PrioridadID!, priorities),
      estado: idToIndexPath(initialValues.EstadoID!, statuses),
      categoria: idToIndexPath(initialValues.CategoriaID!, categories),
      asignado: idToIndexPath(initialValues.UsuarioAsignadoID!, users),
      proyecto: idToIndexPath(initialValues.ProyectoID!, projects),
    };
  }, [initialValues.PrioridadID, initialValues.EstadoID, initialValues.CategoriaID, initialValues.UsuarioAsignadoID, initialValues.ProyectoID, priorities, statuses, categories, users, projects]);

  const [asignadoIndex, setAsignadoIndex] = useState<IndexPath | undefined>(() => idToIndexPath(initialValues.UsuarioAsignadoID, users));
  const [prioridadIndex, setPrioridadIndex] = useState<IndexPath | undefined>(() => idToIndexPath(initialValues.PrioridadID, priorities));
  const [estadoIndex, setEstadoIndex] = useState<IndexPath | undefined>(() => idToIndexPath(initialValues.EstadoID, statuses));
  const [categoriaIndex, setCategoriaIndex] = useState<IndexPath | undefined>(() => idToIndexPath(initialValues.CategoriaID, categories));
  const [proyectoIndex, setProyectoIndex] = useState<IndexPath | undefined>(() => idToIndexPath(initialValues.ProyectoID, projects));

  if (tareaIdRef.current && !task) return <MainLayout title="cargando" />;

  return (
    <ScrollView>
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
            <MainLayout title={task ? task.Nombre : "Nueva tarea"}>
              <ScrollView style={{ flex: 1 }}>
                <Layout
                  style={{
                    marginHorizontal: 20,
                    marginTop: 16,
                    marginBottom: 32,
                    padding: 16,
                    borderRadius: 16,
                    elevation: 4,
                  }}
                >
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
                    textStyle={{ minHeight: 50 }}
                  />

                  <Select
                    label="Proyecto"
                    selectedIndex={proyectoIndex}
                    onSelect={(index) => {
                      const ip = Array.isArray(index) ? index[0] : index;
                      setProyectoIndex(ip);
                      const opt = projects[ip.row];
                      setFieldValue("ProyectoID", opt?.id);
                    }}
                    placeholder="Selecciona un proyecto"
                    accessoryLeft={() => <CustomIcon name="folder-open-outline" />}
                    style={{ marginVertical: 6 }}
                    value={projects.find(p => p.id === values.ProyectoID)?.label ?? "—"}
                  >
                    {projects.map((p: Option) => (
                      <SelectItem key={p.id} title={p.label} />
                    ))}
                  </Select>

                  <Select
                    label="Asignado a"
                    selectedIndex={asignadoIndex}
                    onSelect={(index) => {
                      const ip = Array.isArray(index) ? index[0] : index;
                      setAsignadoIndex(ip);
                      const opt = users[ip.row];
                      setFieldValue("UsuarioAsignadoID", opt?.id);
                    }}
                    placeholder="Selecciona un usuario"
                    accessoryLeft={() => <CustomIcon name="person-outline" />}
                    style={{ marginVertical: 6 }}
                    value={users.find(u => u.id === values.UsuarioAsignadoID)?.label ?? "—"}
                  >
                    {users.map((u: Option) => (
                      <SelectItem key={u.id} title={u.label} />
                    ))}
                  </Select>

                  <Select
                    label="Prioridad"
                    selectedIndex={prioridadIndex}
                    onSelect={(index) => {
                      const ip = Array.isArray(index) ? index[0] : index;
                      setPrioridadIndex(ip);
                      const opt = priorities[ip.row];
                      setFieldValue("PrioridadID", opt?.id);
                    }}
                    placeholder="Selecciona prioridad"
                    accessoryLeft={() => <CustomIcon name="flag-outline" />}
                    style={{ marginVertical: 6 }}
                    value={priorities.find(p => p.id === values.PrioridadID)?.label ?? "—"}
                  >
                    {priorities.map((p: Option) => (
                      <SelectItem key={p.id} title={p.label} />
                    ))}
                  </Select>

                  <Select
                    label="Estado"
                    selectedIndex={estadoIndex}
                    onSelect={(index) => {
                      const ip = Array.isArray(index) ? index[0] : index;
                      setEstadoIndex(ip);
                      const opt = statuses[ip.row];
                      setFieldValue("EstadoID", opt?.id);
                    }}
                    placeholder="Selecciona estado"
                    accessoryLeft={() => <CustomIcon name="ellipse-outline" />}
                    style={{ marginVertical: 6 }}
                    value={statuses.find(s => s.id === values.EstadoID)?.label ?? "—"}
                  >
                    {statuses.map((s: Option) => (
                      <SelectItem key={s.id} title={s.label} />
                    ))}
                  </Select>

                  <Select
                    label="Categoría"
                    selectedIndex={categoriaIndex}
                    onSelect={(index) => {
                      const ip = Array.isArray(index) ? index[0] : index;
                      setCategoriaIndex(ip);
                      const opt = categories[ip.row];
                      setFieldValue("CategoriaID", opt?.id);
                    }}
                    placeholder="Selecciona categoría"
                    accessoryLeft={() => <CustomIcon name="pricetags-outline" />}
                    style={{ marginVertical: 6 }}
                    value={categories.find(c => c.id === values.CategoriaID)?.label ?? "—"}
                  >
                    {categories.map((c: Option) => (
                      <SelectItem key={c.id} title={c.label} />
                    ))}
                  </Select>

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
                    label={tareaIdRef.current ? "Guardar cambios" : "Crear tarea"}
                    onPress={() => handleSubmit()}
                    disabled={mutation.isPending}
                  />
                </Layout>
              </ScrollView>
            </MainLayout>
          );
        }}
      </Formik >
    </ScrollView>
  );
};
