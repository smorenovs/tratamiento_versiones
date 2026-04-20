/* Módulo Compras — 28 tareas en orden de prioridad
   Criterio: Tipo (Ajuste > Mejora > Nuevo > Revisar) → VIP → Impacto → Complejidad
   Bloqueados/Pausados al final de su grupo tipo */

const COMPRAS_TASKS = [

  /* ── AJUSTES (1–8) ──────────────────────────────────────────── */
  {
    id: 519, prioridad: 1,
    tema: "No permitir SNC a Proveedores para ingresos en TE",
    tipo: "Ajuste", estado: "Pendiente",
    cliente: "Farmacia La Esquina", responsable: "Exequiel C.",
    complejidad: "Baja", modulo: "Compras — Solicitudes de NC a Proveedor",
    hu: "Como operador de compras que emite solicitudes de nota de crédito a proveedor, quiero que el sistema no permita asociar una SNC a un ingreso en estado Temporal (TE), para evitar inconsistencias donde una solicitud quede vinculada a un ingreso que todavía no fue confirmado.",
    actor: "Operador de compras",
    precondicion: "El operador intenta emitir una SNC seleccionando ingresos donde al menos uno está en estado TE",
    flujo: "1. El operador inicia la emisión de una SNC y selecciona los ingresos → 2. El sistema valida el estado de cada ingreso antes de permitir confirmar → 3. Todos los ingresos están en estado EM o equivalente confirmado → 4. La SNC se genera y vincula correctamente",
    alternativo: "—",
    postcondicion: "No existe ninguna SNC vinculada a un ingreso en estado TE",
    excepcion: "Si el usuario selecciona un ingreso en TE, el sistema lo resalta, informa el problema y bloquea la confirmación hasta que ese ingreso sea confirmado o removido de la selección",
    criterios: [
      "El sistema valida el estado de todos los ingresos seleccionados antes de permitir confirmar la SNC",
      "Si algún ingreso está en TE, se muestra un mensaje claro indicando cuál es el ingreso con el problema",
      "La validación aplica al estado TE; los demás estados intermedios a validar se definen con el equipo según el flujo de compras",
      "Las SNC ya existentes con esta inconsistencia no se modifican automáticamente (tratar en tarea separada si aplica)"
    ]
  },
  {
    id: 295, prioridad: 2,
    tema: "IVA Simplificado",
    tipo: "Ajuste", estado: "Pendiente",
    cliente: "Interno", responsable: "Pablo V.",
    complejidad: "Media", modulo: "Compras — Comprobantes",
    hu: "Como operador de compras que registra comprobantes de proveedores bajo régimen simplificado, quiero que el sistema soporte el ingreso de IVA simplificado, para poder registrar correctamente las compras sin errores de validación fiscal.",
    actor: "Operador de compras",
    precondicion: "El operador ingresa un comprobante de compra de un proveedor bajo régimen de IVA simplificado",
    flujo: "1. El operador selecciona el tipo de comprobante y el proveedor → 2. El sistema detecta que el proveedor opera bajo IVA simplificado → 3. Muestra el campo correspondiente y aplica la alícuota correcta → 4. El comprobante se registra con el tratamiento fiscal correcto",
    alternativo: "Si el proveedor no tiene definido el tipo de IVA, el sistema solicita que se complete el dato antes de continuar",
    postcondicion: "El comprobante queda registrado con el tratamiento de IVA simplificado correcto y sin errores de validación AFIP",
    excepcion: "Si la configuración de IVA del proveedor está incompleta, se muestra un aviso antes de guardar",
    criterios: [
      "El sistema acepta comprobantes de proveedores bajo IVA simplificado sin mostrar error",
      "La alícuota de IVA simplificado se aplica correctamente al calcular el total del comprobante",
      "El comprobante es exportable a formatos requeridos por AFIP sin rechazos",
      "Los comprobantes existentes no se ven afectados por el cambio"
    ]
  },
  {
    id: 329, prioridad: 3,
    tema: "No se desactivan Proveedor y Organización desde Ingreso de Comprobantes",
    tipo: "Ajuste", estado: "Pendiente",
    cliente: "Interno", responsable: "Pablo V.",
    complejidad: "Baja", modulo: "Compras — Comprobantes",
    hu: "Como operador de compras que completa el ingreso de un comprobante, quiero que al cambiar el proveedor u organización los campos dependientes se limpien o desactiven correctamente, para evitar ingresar datos inconsistentes en el comprobante.",
    actor: "Operador de compras",
    precondicion: "El operador está en la pantalla de ingreso de comprobantes y modifica el proveedor u organización luego de haber llenado otros campos",
    flujo: "1. El operador selecciona un proveedor → 2. Completa campos dependientes → 3. Cambia el proveedor u organización → 4. El sistema limpia o desactiva los campos que dependen del proveedor/organización anterior → 5. El operador completa nuevamente los campos con los valores correctos para el nuevo proveedor",
    alternativo: "—",
    postcondicion: "El comprobante queda registrado con datos consistentes respecto al proveedor u organización seleccionados",
    excepcion: "—",
    criterios: [
      "Al cambiar el proveedor, todos los campos dependientes se resetean o deshabilitan hasta que el nuevo proveedor sea confirmado",
      "Al cambiar la organización, los campos que dependen de ella se actualizan correctamente",
      "No es posible guardar un comprobante con una combinación inconsistente de proveedor/organización y campos dependientes"
    ]
  },
  {
    id: 332, prioridad: 4,
    tema: "Guardar 'total' (previo) de un comprobante de compra cuando se modifique",
    tipo: "Ajuste", estado: "Pendiente",
    cliente: "Interno", responsable: "Pablo V.",
    complejidad: "Baja", modulo: "Compras — Comprobantes",
    hu: "Como operador de compras que modifica comprobantes ya ingresados, quiero que el sistema guarde el total original antes de la modificación, para poder auditar los cambios y detectar diferencias entre el valor ingresado y el modificado.",
    actor: "Operador de compras / Supervisor contable",
    precondicion: "Existe un comprobante de compra ya guardado que el operador va a modificar",
    flujo: "1. El operador abre el comprobante para modificarlo → 2. El sistema registra el total actual como 'total previo' → 3. El operador realiza los cambios → 4. Al guardar, el sistema almacena el nuevo total junto con el total previo → 5. El historial de cambios muestra ambos valores",
    alternativo: "—",
    postcondicion: "El comprobante registra tanto el total modificado como el total previo, disponibles para auditoría",
    excepcion: "Si la modificación no cambia el total, no se genera un registro de diferencia",
    criterios: [
      "Al modificar un comprobante, el total previo queda registrado en el sistema junto al total nuevo",
      "El campo 'total previo' es visible en el detalle del comprobante",
      "Los comprobantes sin modificaciones no muestran el campo 'total previo'",
      "El dato es auditable y no editable por el operador"
    ]
  },
  {
    id: 512, prioridad: 5,
    tema: "Al ingresar una compra y guardarla, cuando se la quiere recuperar, salta error",
    tipo: "Ajuste", estado: "Pendiente",
    cliente: "Interno", responsable: "Mariano B.",
    complejidad: "Media", modulo: "Compras — Comprobantes",
    hu: "Como operador de compras que ingresa y recupera comprobantes, quiero que el sistema permita recuperar una compra recién guardada sin mostrar un error, para poder continuar el flujo de trabajo sin interrupciones ni pérdida de datos.",
    actor: "Operador de compras",
    precondicion: "El operador acaba de guardar un comprobante de compra y lo intenta recuperar desde la misma sesión o desde una búsqueda",
    flujo: "1. El operador ingresa y guarda un comprobante de compra → 2. Intenta recuperarlo mediante búsqueda o desde el historial → 3. El sistema encuentra el comprobante y lo muestra correctamente → 4. El operador puede visualizar o continuar editando el comprobante",
    alternativo: "—",
    postcondicion: "El comprobante guardado es recuperable sin errores",
    excepcion: "Si el comprobante fue guardado con datos incompletos, el sistema informa el problema al recuperar pero no muestra un error genérico",
    criterios: [
      "Un comprobante recién guardado puede recuperarse sin error desde la misma sesión",
      "El error reportado no vuelve a reproducirse en los escenarios de prueba definidos",
      "La causa raíz del error queda documentada y corregida en el código",
      "El fix no introduce regresiones en el flujo de ingreso y recuperación de otros comprobantes"
    ]
  },
  {
    id: 457, prioridad: 6,
    tema: "Error referencia comprobantes de compras",
    tipo: "Ajuste", estado: "Pendiente",
    cliente: "Interno", responsable: "Mariano B.",
    complejidad: "Media", modulo: "Compras — Comprobantes",
    hu: "Como operador de compras que consulta referencias entre comprobantes, quiero que las referencias entre comprobantes de compras se muestren correctamente, para poder tener trazabilidad entre órdenes, recepciones e facturas sin discrepancias.",
    actor: "Operador de compras",
    precondicion: "Existen comprobantes de compra con referencias cruzadas entre sí (ej. orden de compra → remito → factura)",
    flujo: "1. El operador accede a un comprobante de compra → 2. Consulta las referencias vinculadas → 3. El sistema muestra correctamente todos los comprobantes relacionados con sus datos actualizados",
    alternativo: "—",
    postcondicion: "Las referencias entre comprobantes se muestran sin errores y con datos consistentes",
    excepcion: "Si un comprobante referenciado fue anulado, se indica el estado claramente",
    criterios: [
      "Los comprobantes referenciados se muestran correctamente en el detalle",
      "El error original no se reproduce en el entorno de pruebas",
      "Las referencias hacia comprobantes anulados se muestran con estado de anulado",
      "El fix no afecta la visualización de referencias en otros módulos"
    ]
  },
  {
    id: 157, prioridad: 7,
    tema: "Saldo de Reportes se muestra incompleto",
    tipo: "Ajuste", estado: "Pendiente",
    cliente: "Interno", responsable: "Pablo V.",
    complejidad: "Media", modulo: "Compras — Reportes",
    hu: "Como operador de compras que consulta reportes de saldos, quiero que los saldos se muestren completos y correctamente calculados, para poder tomar decisiones sobre pagos a proveedores con información confiable.",
    actor: "Operador de compras / Contador",
    precondicion: "El operador genera un reporte de saldos de compras",
    flujo: "1. El operador configura filtros del reporte de saldos → 2. El sistema procesa todos los movimientos incluidos en el período → 3. El reporte muestra el saldo completo y correcto para cada proveedor",
    alternativo: "—",
    postcondicion: "El reporte de saldos refleja el total real de todos los movimientos sin omisiones",
    excepcion: "Si hay comprobantes con datos incompletos que afectan el saldo, se indica cuáles son en el reporte",
    criterios: [
      "El saldo mostrado en el reporte coincide con la suma real de movimientos del período",
      "No se omiten movimientos al calcular el saldo",
      "El fix es verificable comparando el reporte con el cálculo manual de un período de prueba",
      "Los demás reportes de compras no se ven afectados"
    ]
  },
  {
    id: 67, prioridad: 8,
    tema: "Z566 - Resumen de Compras por Proveedor",
    tipo: "Ajuste", estado: "Bloqueado",
    cliente: "Interno", responsable: "Mariano B.",
    complejidad: "Media", modulo: "Compras — Reportes",
    hu: "Como operador de compras que analiza compras por proveedor, quiero poder generar el resumen de compras por proveedor correctamente, para poder comparar volúmenes y condiciones comerciales entre proveedores.",
    actor: "Operador de compras / Gerente de compras",
    precondicion: "El operador accede al reporte de resumen de compras por proveedor",
    flujo: "1. El operador selecciona período y filtros → 2. El sistema agrupa los comprobantes por proveedor → 3. El reporte muestra totales de compras, descuentos y saldos por proveedor",
    alternativo: "—",
    postcondicion: "El reporte muestra datos completos y correctos agrupados por proveedor",
    excepcion: "Si un proveedor no tiene compras en el período, no aparece en el reporte",
    criterios: [
      "Los totales por proveedor coinciden con la suma de sus comprobantes",
      "El reporte incluye todos los proveedores con actividad en el período seleccionado",
      "Los filtros funcionan correctamente (por fecha, proveedor, sucursal)"
    ]
  },

  /* ── MEJORAS (9–21) ─────────────────────────────────────────── */
  {
    id: 484, prioridad: 9,
    tema: "[ADM-0426_2] - Solicitud de NC (Vinculación con NC)",
    tipo: "Mejora", estado: "Pendiente",
    cliente: "VS Interno (ADM)", responsable: "Adrián S.",
    complejidad: "Media", modulo: "Compras — Notas de Crédito a Proveedor",
    hu: "Como administrativo de compras que gestiona notas de crédito a proveedor, quiero poder vincular directamente una solicitud de NC con la NC recibida del proveedor, para tener trazabilidad completa entre la solicitud generada y el documento finalmente recibido.",
    actor: "Administrativo de compras",
    precondicion: "Existe una solicitud de NC (SNC) generada y se recibe la nota de crédito del proveedor",
    flujo: "1. El operador localiza la SNC → 2. Selecciona 'Vincular con NC recibida' → 3. Busca y selecciona la NC del proveedor → 4. El sistema vincula ambos documentos y actualiza los saldos → 5. El historial refleja la vinculación",
    alternativo: "El operador puede desvincular si la NC vinculada fue errónea y vincular la correcta",
    postcondicion: "La SNC queda vinculada a la NC del proveedor; ambos documentos muestran la referencia cruzada",
    excepcion: "Si la NC ya está vinculada a otra SNC, el sistema lo informa e impide la doble vinculación",
    criterios: [
      "Es posible vincular una SNC con una NC de proveedor desde la pantalla de SNC",
      "Una NC solo puede vincularse a una SNC a la vez",
      "La vinculación actualiza los saldos de ambos documentos automáticamente",
      "La operación queda registrada en el historial de auditoría",
      "Es posible desvincular si la asociación fue incorrecta"
    ]
  },
  {
    id: 487, prioridad: 10,
    tema: "[ADM-0426_3] - Poder determinar el crédito fiscal de medicamentos",
    tipo: "Mejora", estado: "Pendiente",
    cliente: "VS Interno (ADM)", responsable: "Adrián S.",
    complejidad: "Media", modulo: "Compras — Liquidación impositiva",
    hu: "Como contador que liquida impuestos de compras de medicamentos, quiero que el sistema permita determinar el crédito fiscal de medicamentos por compra, para poder presentar la declaración de IVA correctamente diferenciando medicamentos de otros artículos.",
    actor: "Contador / Administrativo impositivo",
    precondicion: "El período de compras incluye comprobantes de medicamentos con tratamiento especial de IVA",
    flujo: "1. El contador accede al módulo de liquidación impositiva → 2. El sistema identifica los artículos tipo medicamento en las compras → 3. Calcula el crédito fiscal específico según la alícuota aplicable → 4. El reporte detalla el crédito fiscal por medicamentos separado del resto",
    alternativo: "—",
    postcondicion: "El crédito fiscal de medicamentos queda determinado y disponible para la declaración de IVA",
    excepcion: "Si un medicamento no tiene alícuota definida, se indica en el reporte para corrección manual",
    criterios: [
      "El sistema identifica automáticamente los artículos clasificados como medicamentos",
      "El crédito fiscal de medicamentos se calcula correctamente según la alícuota vigente",
      "El reporte separa el crédito fiscal de medicamentos del crédito fiscal general",
      "El resultado es exportable para su uso en la declaración jurada"
    ]
  },
  {
    id: 476, prioridad: 11,
    tema: "[ADM-0426_1] - Resumen de Comprobantes por Proveedor",
    tipo: "Mejora", estado: "Pendiente",
    cliente: "VS Interno (ADM)", responsable: "Adrián S.",
    complejidad: "Baja", modulo: "Compras — Reportes",
    hu: "Como contador que concilia compras con proveedores, quiero acceder a un resumen consolidado de comprobantes por proveedor con totales por tipo, para poder verificar el estado de cuenta con cada proveedor de forma rápida.",
    actor: "Contador / Administrativo de compras",
    precondicion: "Existen comprobantes de compra del período registrados en el sistema",
    flujo: "1. El contador selecciona el proveedor y el período → 2. El sistema agrupa todos los comprobantes por tipo (facturas, NC, débitos) → 3. Muestra los totales por tipo y el saldo neto → 4. El contador puede exportar el resumen",
    alternativo: "—",
    postcondicion: "El contador tiene disponible el resumen consolidado por proveedor exportable",
    excepcion: "Si el proveedor no tiene actividad en el período, se muestra mensaje informativo",
    criterios: [
      "El reporte muestra todos los tipos de comprobante del proveedor en el período",
      "Los totales por tipo son correctos y el saldo neto coincide con la cuenta corriente",
      "El reporte es exportable a Excel",
      "Funciona para todos los proveedores sin excepción"
    ]
  },
  {
    id: 518, prioridad: 12,
    tema: "Desvincular NCP asociada a una presentación para aplicarla a otra",
    tipo: "Mejora", estado: "Pendiente",
    cliente: "VS Interno", responsable: "Exequiel C.",
    complejidad: "Media", modulo: "Compras — Notas de Crédito a Proveedor",
    hu: "Como administrativo de compras que gestiona notas de crédito a proveedores, quiero poder desvincular una NCP ya asociada a una presentación y reasignarla a otra, para corregir asociaciones incorrectas sin necesidad de anular y recrear documentos.",
    actor: "Administrativo de compras",
    precondicion: "Existe una NCP vinculada a una presentación que el usuario necesita reasignar",
    flujo: "1. El usuario localiza la NCP vinculada a la presentación origen → 2. Selecciona 'Desvincular' → 3. El sistema libera la NCP y recalcula los saldos de la presentación origen → 4. El usuario selecciona la nueva presentación destino → 5. El sistema vincula la NCP y actualiza los saldos de la presentación destino",
    alternativo: "El usuario puede desvincular sin reasignar de inmediato, dejando la NCP disponible para aplicarla luego",
    postcondicion: "La NCP queda asociada a la nueva presentación; los saldos de ambas presentaciones son correctos",
    excepcion: "Si la presentación origen ya fue cerrada contablemente, bloquear la desvinculación e informar el motivo",
    criterios: [
      "Solo es posible desvincular NCPs de presentaciones que no estén cerradas contablemente",
      "Al desvincular, los saldos de la presentación origen se recalculan automáticamente",
      "Al vincular a la nueva presentación, los saldos del destino se actualizan automáticamente",
      "La operación queda registrada en el historial de auditoría de la NCP",
      "El flujo original de vinculación no se modifica; solo se agrega la opción de desvincular"
    ]
  },
  {
    id: 468, prioridad: 13,
    tema: "No se puede realizar SNC de varias líneas con un mismo artículo",
    tipo: "Mejora", estado: "Pendiente",
    cliente: "Interno", responsable: "Exequiel C.",
    complejidad: "Media", modulo: "Compras — Solicitudes de NC a Proveedor",
    hu: "Como operador de compras que genera solicitudes de NC a proveedor, quiero poder incluir varias líneas del mismo artículo en una misma SNC, para poder cubrir casos en que el mismo producto fue recibido en condiciones distintas o tiene múltiples motivos de devolución.",
    actor: "Operador de compras",
    precondicion: "El operador genera una SNC y necesita incluir el mismo artículo más de una vez con distintas cantidades o motivos",
    flujo: "1. El operador inicia una SNC → 2. Agrega una línea con el artículo A → 3. Agrega una segunda línea con el mismo artículo A (diferente cantidad/motivo) → 4. El sistema acepta ambas líneas y las incluye en la SNC → 5. La SNC se genera correctamente con ambas líneas",
    alternativo: "—",
    postcondicion: "La SNC contiene múltiples líneas del mismo artículo con cantidades y motivos diferenciados",
    excepcion: "Si el total de las líneas del mismo artículo supera el total comprado, el sistema advierte antes de confirmar",
    criterios: [
      "Es posible agregar más de una línea del mismo artículo en una SNC",
      "Cada línea puede tener cantidad y motivo independientes",
      "El total de la SNC calcula correctamente sumando todas las líneas",
      "El cambio no afecta la generación de SNC con artículos únicos"
    ]
  },
  {
    id: 200, prioridad: 14,
    tema: "Z654 - Reporte Inc. Cpras vs Facturas",
    tipo: "Mejora", estado: "Pendiente",
    cliente: "Interno", responsable: "Exequiel C.",
    complejidad: "Media", modulo: "Compras — Reportes",
    hu: "Como contador que concilia compras con facturas de proveedores, quiero acceder a un reporte de inconsistencias entre compras registradas y facturas recibidas, para poder identificar y corregir diferencias antes del cierre contable.",
    actor: "Contador / Operador de compras",
    precondicion: "Existen compras registradas y facturas de proveedor en el sistema para un período dado",
    flujo: "1. El contador accede al reporte de inconsistencias → 2. Selecciona el período → 3. El sistema compara compras registradas contra facturas → 4. Lista los casos donde hay diferencia de montos, artículos o fechas → 5. El contador puede exportar para gestionar las correcciones",
    alternativo: "—",
    postcondicion: "El contador tiene una lista accionable de inconsistencias entre compras y facturas",
    excepcion: "Si no hay inconsistencias en el período, el reporte lo indica explícitamente",
    criterios: [
      "El reporte detecta diferencias de monto entre la compra registrada y la factura del proveedor",
      "Se identifican facturas sin compra asociada y compras sin factura",
      "El reporte es exportable a Excel",
      "Los resultados son correctos y verificables manualmente"
    ]
  },
  {
    id: 226, prioridad: 15,
    tema: "Z674 - Devolución de Producto por Sobrante",
    tipo: "Mejora", estado: "Pendiente",
    cliente: "Interno", responsable: "Exequiel C.",
    complejidad: "Media", modulo: "Compras — Devoluciones",
    hu: "Como operador de compras que gestiona sobrantes de pedidos, quiero poder registrar una devolución de producto por sobrante directamente desde el ingreso, para corregir el stock y generar el comprobante de devolución sin procesos manuales adicionales.",
    actor: "Operador de compras",
    precondicion: "Se registra un ingreso de mercadería con sobrante respecto a lo pedido",
    flujo: "1. El operador identifica el sobrante durante el ingreso → 2. Selecciona los artículos sobrantes y la cantidad → 3. El sistema genera el comprobante de devolución → 4. El stock se ajusta descontando el sobrante devuelto → 5. El proveedor queda notificado del sobrante en el documento",
    alternativo: "La devolución puede registrarse en un momento posterior al ingreso inicial",
    postcondicion: "El sobrante queda registrado como devolución, el stock es correcto y el proveedor tiene el comprobante",
    excepcion: "Si el proveedor no acepta devoluciones de sobrantes, el operador puede marcarlo como diferencia sin generar devolución",
    criterios: [
      "Es posible registrar la devolución del sobrante desde la pantalla de ingreso",
      "El comprobante de devolución se genera automáticamente con los datos del ingreso",
      "El stock descuenta el sobrante devuelto al confirmar la devolución",
      "La devolución queda vinculada al ingreso de origen para trazabilidad"
    ]
  },
  {
    id: 219, prioridad: 16,
    tema: "Z668 - Actualización de Precios en base a Ingresos",
    tipo: "Mejora", estado: "Pendiente",
    cliente: "Interno", responsable: "Mariano B.",
    complejidad: "Alta", modulo: "Compras — Actualización de Precios",
    hu: "Como operador que gestiona precios de artículos, quiero que el sistema actualice automáticamente el precio de costo al registrar un ingreso de compra, para tener siempre el costo actualizado sin necesidad de actualización manual.",
    actor: "Operador de compras / Gerente de precios",
    precondicion: "Se registra un ingreso de mercadería con precios que difieren del costo actual registrado",
    flujo: "1. El operador registra un ingreso de compra → 2. El sistema compara los precios del ingreso con los precios de costo actuales → 3. Si detecta diferencias, propone la actualización → 4. El operador confirma o rechaza la actualización → 5. Los precios de costo se actualizan para los artículos correspondientes",
    alternativo: "La actualización puede configurarse como automática sin solicitar confirmación al operador",
    postcondicion: "Los precios de costo de los artículos reflejan el último precio de ingreso",
    excepcion: "Si el precio del ingreso es 0 o negativo, el sistema no propone actualización y emite una advertencia",
    criterios: [
      "El sistema detecta la diferencia de precio entre el ingreso y el costo registrado",
      "La propuesta de actualización es clara y muestra precio anterior vs. nuevo",
      "La actualización es opcional: el operador puede aceptarla o rechazarla",
      "Solo se actualizan los artículos del ingreso confirmado",
      "La actualización no afecta comprobantes ya emitidos con precios anteriores"
    ]
  },
  {
    id: 348, prioridad: 17,
    tema: "Redondeo de Cuenta Corriente de Compras",
    tipo: "Mejora", estado: "Pendiente",
    cliente: "Interno", responsable: "Adrián S.",
    complejidad: "Baja", modulo: "Compras — Cuenta Corriente",
    hu: "Como contador que cierra la cuenta corriente de compras, quiero que el sistema aplique redondeo automático a los saldos residuales mínimos de la cuenta corriente, para evitar diferencias de centavos que impidan el cierre limpio de cuentas.",
    actor: "Contador",
    precondicion: "Existe un saldo residual de centavos en la cuenta corriente de un proveedor al momento del cierre",
    flujo: "1. El contador revisa el estado de cuenta de un proveedor → 2. El sistema identifica saldos residuales por debajo del umbral de redondeo configurado → 3. Aplica el redondeo automático → 4. El saldo queda en cero sin diferencias",
    alternativo: "El contador puede revisar y aprobar el redondeo antes de aplicarlo",
    postcondicion: "La cuenta corriente del proveedor cierra sin saldo residual de centavos",
    excepcion: "Si el umbral de redondeo no está configurado, el sistema utiliza el valor por defecto (ej. hasta $1)",
    criterios: [
      "El redondeo se aplica automáticamente a saldos residuales dentro del umbral configurado",
      "El umbral de redondeo es configurable por el administrador",
      "El redondeo queda registrado en el historial de la cuenta corriente",
      "No se redondean saldos que superen el umbral"
    ]
  },
  {
    id: 223, prioridad: 18,
    tema: "Z362 - Pedidos Sud - WS",
    tipo: "Mejora", estado: "Pendiente",
    cliente: "Interno", responsable: "Mariano B.",
    complejidad: "Alta", modulo: "Compras — Pedidos a Proveedores",
    hu: "Como operador de compras que gestiona pedidos a Distribuidora Sud, quiero poder enviar pedidos directamente desde Zafiro a través del web service de Sud, para evitar la carga manual duplicada y reducir errores de transcripción.",
    actor: "Operador de compras",
    precondicion: "Zafiro está integrado con el web service de Distribuidora Sud y el operador tiene un pedido listo para enviar",
    flujo: "1. El operador genera el pedido a Distribuidora Sud en Zafiro → 2. Selecciona 'Enviar por WS' → 3. El sistema conecta con el WS de Sud y transmite el pedido → 4. Recibe confirmación del número de pedido del proveedor → 5. El pedido queda marcado como enviado con el número de referencia de Sud",
    alternativo: "Si el WS no está disponible, se puede exportar el pedido en formato compatible con Sud",
    postcondicion: "El pedido queda transmitido a Sud y confirmado con referencia del proveedor",
    excepcion: "Si el WS de Sud devuelve error, se muestra el mensaje del proveedor y se permite reintentar",
    criterios: [
      "El pedido se transmite correctamente al WS de Sud sin errores de formato",
      "Se registra el número de pedido de Sud como referencia en Zafiro",
      "El estado del pedido cambia a 'Enviado' al recibir confirmación del WS",
      "Los errores del WS se muestran con mensaje claro para el operador",
      "El flujo de pedido manual sigue funcionando como alternativa"
    ]
  },
  {
    id: 289, prioridad: 19,
    tema: "Carrito de pedidos",
    tipo: "Mejora", estado: "Pendiente",
    cliente: "Interno", responsable: "Mariano B.",
    complejidad: "Alta", modulo: "Compras — Pedidos a Proveedores",
    hu: "Como operador de compras que arma pedidos a múltiples proveedores, quiero poder agregar artículos a un carrito de pedido desde distintas pantallas y generar el pedido al final, para agilizar la carga sin tener que abrir cada pedido por separado.",
    actor: "Operador de compras",
    precondicion: "El operador tiene acceso al módulo de compras y quiere armar un pedido a uno o varios proveedores",
    flujo: "1. El operador navega por los artículos o el historial de compras → 2. Agrega artículos al carrito con cantidad y proveedor → 3. Revisa el carrito antes de confirmar → 4. Genera el/los pedido/s desde el carrito → 5. El sistema crea los pedidos agrupados por proveedor",
    alternativo: "El carrito puede guardarse como borrador para completarlo en otra sesión",
    postcondicion: "Los pedidos quedan generados y listos para envío agrupados por proveedor",
    excepcion: "Si un artículo no tiene proveedor asignado, se advierte al operador antes de generar el pedido",
    criterios: [
      "El operador puede agregar artículos al carrito desde la pantalla de artículos y desde el historial de compras",
      "El carrito persiste entre sesiones del mismo usuario",
      "Los pedidos se generan agrupados por proveedor al confirmar el carrito",
      "Es posible eliminar o modificar líneas del carrito antes de confirmar",
      "El carrito vacío no genera pedidos"
    ]
  },
  {
    id: 213, prioridad: 20,
    tema: "Z609 - Bloqueo para Pedido - Gestión",
    tipo: "Mejora", estado: "Pendiente",
    cliente: "Interno", responsable: "Mariano B.",
    complejidad: "Media", modulo: "Compras — Pedidos a Proveedores",
    hu: "Como operador de compras que gestiona bloqueos en pedidos, quiero poder gestionar bloqueos aplicados a pedidos desde el módulo de gestión, para resolver impedimentos de envío sin necesidad de salir al módulo de configuración.",
    actor: "Operador de compras / Supervisor",
    precondicion: "Existe un pedido con bloqueo aplicado que impide su envío o confirmación (depende de T.211)",
    flujo: "1. El operador accede al pedido bloqueado → 2. Visualiza el motivo del bloqueo → 3. Si tiene permisos, puede levantar el bloqueo desde la pantalla de gestión → 4. El pedido queda desbloqueado y disponible para continuar",
    alternativo: "—",
    postcondicion: "El bloqueo del pedido queda resuelto y el pedido puede continuar su flujo",
    excepcion: "Si el usuario no tiene permisos para levantar el bloqueo, debe escalar a un supervisor",
    criterios: [
      "Los motivos de bloqueo se muestran en la pantalla de gestión del pedido",
      "Un usuario con permisos puede levantar el bloqueo desde la misma pantalla",
      "Al levantar el bloqueo, el pedido retoma su flujo normal",
      "La operación queda registrada en el historial del pedido"
    ]
  },
  {
    id: 211, prioridad: 21,
    tema: "Z568 - Bloqueo para Pedido - Repo Diaria x Suc.",
    tipo: "Mejora", estado: "Bloqueado",
    cliente: "Interno", responsable: "Mariano B.",
    complejidad: "Alta", modulo: "Compras — Pedidos a Proveedores",
    hu: "Como operador de compras que ejecuta la reposición diaria por sucursal, quiero poder gestionar bloqueos automáticos en pedidos de reposición cuando se detectan inconsistencias, para evitar enviar pedidos con datos incorrectos al proveedor.",
    actor: "Operador de compras",
    precondicion: "El sistema genera un pedido de reposición diaria por sucursal que activa una regla de bloqueo",
    flujo: "1. El sistema genera el pedido de reposición → 2. Evalúa las reglas de bloqueo definidas → 3. Si detecta una inconsistencia, bloquea el pedido y notifica al operador → 4. El operador revisa y resuelve el motivo → 5. El pedido se desbloquea y se envía",
    alternativo: "—",
    postcondicion: "El pedido de reposición se envía correctamente o queda bloqueado con motivo documentado",
    excepcion: "Si no se puede determinar el motivo del bloqueo, se escala al equipo de soporte técnico",
    criterios: [
      "Los pedidos de reposición que incumplen las reglas quedan bloqueados automáticamente",
      "El motivo del bloqueo se muestra claramente al operador",
      "Es posible resolver el bloqueo desde la pantalla de gestión de pedidos",
      "La funcionalidad de T.213 depende de que esta tarea esté implementada"
    ]
  },

  {
    id: 224, prioridad: 22,
    tema: "Z671 - Encargos de Productos",
    tipo: "Mejora", estado: "Backlog",
    cliente: "Sin asignar", responsable: "—",
    complejidad: "Alta", modulo: "Compras — Pedidos a Proveedores",
    hu: "Como operador de compras que gestiona encargos de clientes, quiero poder registrar encargos de productos específicos vinculados a un cliente, para gestionar la compra puntual y la entrega al cliente que lo solicitó.",
    actor: "Operador de compras",
    precondicion: "Un cliente solicita un producto que no está en stock habitual",
    flujo: "1. El operador registra el encargo con cliente, artículo y cantidad → 2. Genera un pedido al proveedor vinculado al encargo → 3. Al recibir el pedido, el sistema reserva el stock para el encargo → 4. El encargo queda disponible para entrega al cliente",
    alternativo: "—",
    postcondicion: "El encargo queda registrado, comprado y reservado para el cliente",
    excepcion: "Si el proveedor no puede abastecer el encargo, se notifica al cliente",
    criterios: [
      "Es posible crear un encargo vinculado a un cliente desde el módulo de compras",
      "El pedido al proveedor queda vinculado al encargo para trazabilidad",
      "Al recibir la mercadería del encargo, el stock queda reservado automáticamente para el cliente",
      "El operador puede consultar el estado de todos los encargos pendientes"
    ]
  },
  {
    id: 225, prioridad: 23,
    tema: "Z672 - Solicitud de Productos en Falta",
    tipo: "Mejora", estado: "Backlog",
    cliente: "Sin asignar", responsable: "—",
    complejidad: "Media", modulo: "Compras — Pedidos a Proveedores",
    hu: "Como operador de ventas o stock que detecta productos faltantes, quiero poder registrar una solicitud de reposición para productos en falta, para que el área de compras reciba el pedido y pueda gestionar la reposición a tiempo.",
    actor: "Operador de ventas / Operador de stock",
    precondicion: "Se detecta un artículo en falta o con stock por debajo del mínimo",
    flujo: "1. El operador registra la solicitud de reposición con artículo y cantidad sugerida → 2. El área de compras recibe la solicitud → 3. Genera el pedido al proveedor correspondiente → 4. Al recibir el pedido, el stock se repone",
    alternativo: "La solicitud puede generarse automáticamente cuando el stock baja del mínimo configurado",
    postcondicion: "La solicitud queda registrada y visible para el área de compras para gestión",
    excepcion: "Si el artículo no tiene proveedor asignado, la solicitud queda pendiente de asignación",
    criterios: [
      "El operador puede registrar una solicitud de reposición desde el módulo de ventas o stock",
      "Las solicitudes son visibles en el módulo de compras con estado actualizado",
      "Es posible configurar la generación automática de solicitudes por stock mínimo",
      "Las solicitudes pueden vincularse a pedidos de compra para trazabilidad"
    ]
  },

  /* ── NUEVOS (24–27) ─────────────────────────────────────────── */
  {
    id: 307, prioridad: 24,
    tema: "Aplicación de NC Proveedor a Bonos Dto.",
    tipo: "Nuevo", estado: "Pendiente",
    cliente: "Interno", responsable: "Pablo V.",
    complejidad: "Media", modulo: "Compras — Notas de Crédito a Proveedor",
    hu: "Como administrativo de compras que gestiona bonos de descuento de proveedores, quiero poder aplicar una nota de crédito de proveedor directamente a un bono de descuento, para simplificar la imputación contable y reducir la deuda con el proveedor usando el crédito disponible.",
    actor: "Administrativo de compras",
    precondicion: "Existe una NC de proveedor disponible y un bono de descuento del mismo proveedor pendiente de aplicación",
    flujo: "1. El administrativo accede a las NCs disponibles del proveedor → 2. Selecciona la NC y elige 'Aplicar a bono de descuento' → 3. Selecciona el bono correspondiente → 4. El sistema aplica la NC al bono, reduciendo el saldo → 5. Ambos documentos quedan vinculados y con saldos actualizados",
    alternativo: "La NC puede aplicarse parcialmente al bono si el monto de la NC supera el del bono",
    postcondicion: "La NC queda imputada al bono de descuento; el saldo del bono se reduce en el monto aplicado",
    excepcion: "Si la NC y el bono son de proveedores distintos, el sistema impide la aplicación",
    criterios: [
      "Es posible aplicar una NC de proveedor a un bono de descuento del mismo proveedor",
      "La aplicación puede ser total o parcial",
      "El saldo de la NC y del bono se actualiza automáticamente al aplicar",
      "La operación queda registrada en el historial contable de ambos documentos",
      "No se pueden vincular documentos de proveedores distintos"
    ]
  },
  {
    id: 222, prioridad: 25,
    tema: "Z199 - Pedidos Monroe",
    tipo: "Nuevo", estado: "Pendiente",
    cliente: "Interno", responsable: "Mariano B.",
    complejidad: "Alta", modulo: "Compras — Pedidos a Proveedores",
    hu: "Como operador de compras que gestiona pedidos a Monroe, quiero poder enviar pedidos directamente a Monroe desde Zafiro, para evitar la carga manual en el portal del proveedor y reducir errores de transcripción.",
    actor: "Operador de compras",
    precondicion: "Zafiro tiene configurada la integración con Monroe y el operador tiene un pedido listo",
    flujo: "1. El operador genera el pedido a Monroe en Zafiro → 2. Selecciona 'Enviar a Monroe' → 3. El sistema transmite el pedido al sistema de Monroe → 4. Recibe confirmación con número de pedido Monroe → 5. El pedido queda marcado como enviado",
    alternativo: "Si la integración no está disponible, se exporta el pedido en formato compatible con Monroe",
    postcondicion: "El pedido queda transmitido a Monroe y confirmado en Zafiro",
    excepcion: "Si Monroe devuelve error, se muestra el detalle y se permite reintentar",
    criterios: [
      "El pedido se transmite correctamente a Monroe sin errores de formato",
      "Se registra el número de pedido de Monroe como referencia en Zafiro",
      "El estado del pedido cambia a 'Enviado' al confirmar la transmisión",
      "Los errores de Monroe se muestran con mensaje claro",
      "El flujo manual sigue disponible como alternativa"
    ]
  },
  {
    id: 163, prioridad: 26,
    tema: "Agregar la posibilidad de información para un reporte",
    tipo: "Nuevo", estado: "Backlog",
    cliente: "Sin asignar", responsable: "—",
    complejidad: "Media", modulo: "Compras — Reportes",
    hu: "Como operador de compras que genera reportes, quiero poder agregar información adicional personalizada a los reportes de compras, para adaptar los reportes a necesidades específicas de análisis sin desarrollos adicionales.",
    actor: "Operador de compras / Administrador",
    precondicion: "El operador accede a la configuración de reportes de compras",
    flujo: "1. El operador accede a la configuración del reporte → 2. Selecciona los campos adicionales a incluir → 3. Guarda la configuración → 4. El reporte generado incluye la información adicional configurada",
    alternativo: "—",
    postcondicion: "El reporte incluye los campos adicionales configurados por el operador",
    excepcion: "Si se seleccionan campos que impactan negativamente el rendimiento, se advierte al usuario",
    criterios: [
      "El operador puede seleccionar campos adicionales desde una lista de opciones disponibles",
      "Los campos seleccionados se incluyen en el reporte generado",
      "La configuración es guardable y reutilizable",
      "La configuración de un usuario no afecta los reportes de otros usuarios"
    ]
  },
  {
    id: 64, prioridad: 27,
    tema: "Z487 - Compra Inteligente Multiproveedor Etapa 1",
    tipo: "Nuevo", estado: "Pausado",
    cliente: "Interno", responsable: "Mariano B.",
    complejidad: "Alta", modulo: "Compras — Pedidos a Proveedores",
    hu: "Como gerente de compras que optimiza el costo de abastecimiento, quiero que el sistema proponga la distribución óptima de un pedido entre múltiples proveedores basándose en precios y condiciones, para minimizar el costo total de compra.",
    actor: "Gerente de compras / Operador de compras",
    precondicion: "El artículo a pedir tiene al menos dos proveedores configurados con precios actualizados",
    flujo: "1. El operador inicia un pedido → 2. Activa 'Compra Inteligente' → 3. El sistema analiza precios y condiciones de todos los proveedores habilitados → 4. Propone la distribución del pedido que minimiza el costo → 5. El operador revisa y confirma o ajusta la distribución",
    alternativo: "El operador puede ignorar la sugerencia y hacer el pedido al proveedor de su elección",
    postcondicion: "El pedido queda distribuido entre los proveedores seleccionados de forma óptima",
    excepcion: "Si solo hay un proveedor disponible para el artículo, no se activa la lógica multiproveedor",
    criterios: [
      "El sistema analiza al menos 2 proveedores por artículo para hacer la propuesta",
      "La propuesta muestra el ahorro estimado vs. comprar todo a un único proveedor",
      "El operador puede aceptar, rechazar o modificar la propuesta antes de confirmar",
      "La etapa 1 cubre artículos con precio de lista; descuentos por volumen se contemplan en etapas futuras"
    ]
  },

  /* ── REVISAR (28) ───────────────────────────────────────────── */
  {
    id: 380, prioridad: 28,
    tema: "No se muestran NC en Reporte de Saldos de Compr. por Prov. por Vto.",
    tipo: "Revisar", estado: "Pendiente",
    cliente: "Interno", responsable: "Mariano B.",
    complejidad: "Media", modulo: "Compras — Reportes",
    hu: "Como contador que analiza vencimientos de saldos de compras, quiero que las notas de crédito aparezcan correctamente en el reporte de saldos por proveedor por vencimiento, para que el saldo neto refleje las NC como descuento sobre la deuda.",
    actor: "Contador",
    precondicion: "Existen NCs de proveedor que deberían aparecer en el reporte de saldos por vencimiento",
    flujo: "1. El contador genera el reporte de saldos de compras por proveedor por vencimiento → 2. El sistema incluye todas las facturas, NC y débitos del período → 3. Las NC aparecen como líneas que reducen el saldo → 4. El saldo neto refleja la deuda real",
    alternativo: "—",
    postcondicion: "El reporte muestra NC incluidas y el saldo neto es correcto",
    excepcion: "Si una NC no tiene vencimiento asignado, se clasifica en una columna especial para revisión",
    criterios: [
      "Las NCs de proveedor aparecen en el reporte de saldos por vencimiento",
      "El saldo neto por vencimiento incluye el efecto de las NC",
      "El comportamiento es consistente para todos los proveedores",
      "Se investiga si el problema es de visualización o de cálculo antes de cerrar la tarea"
    ]
  },

];

