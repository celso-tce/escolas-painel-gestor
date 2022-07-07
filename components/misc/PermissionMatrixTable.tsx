import { faCheck, faTimes } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from 'react';
import { userRoles } from "../../lib/escolas/enums";
import { ActionPermission, defaultPermissionInfoMap, PermissionMatrix } from "../../lib/escolas/permissions";
import { Utils } from "../../lib/utils";

type PermissionMatrixTableProps = {
  permissions: PermissionMatrix;
};

const PermissionMatrixTable: React.FC<PermissionMatrixTableProps> = ({
  permissions,
}) => {
  const normalUserRoles = userRoles.filter((role) => role !== 'ADMIN');

  const commonCss = 'px-4 py-2 bg-white';
  const headerCss = commonCss + ' bg-slate-50 text-slate-600 font-medium text-lg';
  const colCss = commonCss + ' ';

  return (
    <div
      className="bg-slate-300 shadow"
      style={{
        display: 'inline-grid',
        gridTemplateColumns: `auto ${userRoles.map(() => '1fr').join(' ')}`,
        gridTemplateRows: `auto ${Object.keys(permissions).map(() => '1fr').join(' ')}`,
        columnGap: '1px',
        rowGap: '1px',
      }}
    >
      <div className={`${headerCss}`}>
        Permissão
      </div>
      {userRoles.map((role) => (
        <div key={role} className={`text-center ${headerCss}`}>
          {Utils.userRoleLabel(role)}
        </div>
      ))}

      {Object.entries(permissions).map(([permission, roles], index) => {
        const info = defaultPermissionInfoMap[permission as keyof typeof ActionPermission];

        return (<React.Fragment key={index}>
          <div className={`text-slate-800 max-w-xl ${colCss}`}>
            {info.label}

            <div className="mt-1 text-slate-500 text-xs">
              {info.description}
            </div>
          </div>

          {userRoles.map((role, index) => {
            const allowed = role === 'ADMIN' || roles.includes(role);

            return (
              <div
                key={index}
                className={`flex items-center justify-center
                  ${colCss} ${allowed ? 'text-green-500' : 'text-red-500'}`}
              >
                {allowed
                    ? <FontAwesomeIcon icon={faCheck} fixedWidth />
                    : <FontAwesomeIcon icon={faTimes} fixedWidth />}
              </div>
            );
          })}
        </React.Fragment>);
      })}
    </div>
  );
};

export default React.memo(PermissionMatrixTable);
