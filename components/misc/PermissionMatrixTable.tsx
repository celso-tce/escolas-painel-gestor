import { faCheck, faTimes } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from 'react';
import { userRoles } from "../../lib/escolas/enums";
import { ActionPermission, defaultPermissionInfoMap, PermissionMatrix } from "../../lib/escolas/permissions";
import { Utils } from "../../lib/utils";
import SimpleTable from "../ui/tables/SimpleTable";

type PermissionMatrixTableProps = {
  permissions: PermissionMatrix;
};

const PermissionMatrixTable: React.FC<PermissionMatrixTableProps> = ({
  permissions,
}) => {
  return (
    <SimpleTable
      overrideHeaderClasses="p-4 border border-slate-200 text-slate-600 text-left bg-slate-50"
      overrideColClasses="p-4 border border-slate-200"
      header={[
        { label: 'Permissão' },
        ...userRoles.map((role) => ({
          label: Utils.userRoleLabel(role),
        }))
      ]}
      rows={Object.entries(permissions).map(([permission, roles], index) => {
        const info = defaultPermissionInfoMap[permission as keyof typeof ActionPermission];

        return {
          cols: [
            {
              content: (<>
                <div>
                  {info.label}
                </div>
                {info.description && (
                  <div className="text-slate-600 text-sm">
                    {info.description}
                    {info.description}
                  </div>
                )}
              </>),
              classes: 'text-slate-800 whitespace-normal max-w-xl',
            },
            ...userRoles.map((role) => {
              const allowed = roles.includes(role);

              return {
                content: allowed
                  ? <FontAwesomeIcon icon={faCheck} fixedWidth />
                  : <FontAwesomeIcon icon={faTimes} fixedWidth />,
                title: Utils.userRoleLabel(role),
                classes: 'text-center'
                  + (allowed ? ' text-green-500' : ' text-red-500'),
              };
            }),
          ],
        };
      })}
    />
  );
};

export default React.memo(PermissionMatrixTable);
