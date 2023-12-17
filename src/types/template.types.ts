export type Template = {
  nombreCliente: string;
  numeroRecibo: string;
  numeroPoliza: string;
  comision: string;
  nif?: string;
  fecha?: Date;
};

export type RowData = Template & { existe: boolean };

export type KeyMap = {
  [key: string]: string;
};

export enum Headers {
  comision = "Comisión",
  numeroPoliza = "Número de Póliza",
  numeroRecibo = "Número de Recibo",
  nombreCliente = "Nombre del Cliente",
}

export enum HeadersOpcionales {
  nif = "NIF/CIF",
  fecha = "Fecha",
}

export type KeyHeaderIndex = {
  [key: string]: { key: string; index: number };
};

export type ComparatorValue = "numeroPoliza" | "numeroRecibo";
