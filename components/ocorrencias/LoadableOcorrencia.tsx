import { Ocorrencia } from "escolas-shared";
import React from "react";
import { OcorrenciaWithAll } from "../../lib/services/api-service";

// usado para "lazy-loadar" ocorrencias que não foram "eager-loaded"

export default function LoadableOcorrencia(props: {
  ocorrencia: Ocorrencia;
  children: (ocorrenciaWithAll: OcorrenciaWithAll) => React.ReactNode;
  loader: () => Promise<OcorrenciaWithAll>;
}): React.ReactElement {
  const [ocorrenciaWithAll, setOcorrenciaWithAll] = React.useState<OcorrenciaWithAll>();

  React.useEffect(() => {
    props.loader().then(setOcorrenciaWithAll);
  }, [props]);

  if (ocorrenciaWithAll === undefined)
    return <>Carregando ocorrência...</>;

  return <>{props.children(ocorrenciaWithAll)}</>;
}
