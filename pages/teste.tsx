import React from 'react';

type TesteProps = {};

const Teste: React.FC<TesteProps> = (props) => {
  console.log('Desenhando "Teste"');

  let valor = 1;

  valor++;
  valor++;

  return (
    <div>
      <div>

        Valor: {valor}

        <button className="bg-cyan-100" onClick={() => {
          valor++;
        }}>
          Incrementar
        </button>

      </div>
    </div>
  );
};

export default React.memo(Teste);
