const { PA_ATTEND_MODE, PA_ENABLED } = process.env;
import { PowerautomateUrls, MapQGISParamsType } from '../utils/constants';
import { generateMapPowerShell } from './powershell/generate-map';
export type RequestMapParams = {
  dataSource: string;
  zoomLevel: string;
  latLng: Array<number>;
};
export type RequestOutputParams = {
  outputPath: string;
  id: string;
};

export type RequestMapResponse = {
  result: RequestMapResult;
};
type RequestMapResult = {
  url: string;
};

const isPAEnabled = (): boolean => PA_ENABLED == 'true';

export const requestMap = async (
  input: MapQGISParamsType
): Promise<RequestMapResponse> => {
  let result;
  if (!isPAEnabled()) {
    result = await generateMapPowerShell(
      input.extent.toString(),
      input.output_filename.toString(),
      input.project_name.toString()
    );
  } else {
    const mode = `${PA_ATTEND_MODE}`;
    if (mode == 'attended') {
      result = await requestMapAttended(input);
    } else {
      console.log('attended');
      result = await requestMapUnattended(input);
    }

    if (result.error) {
      console.log(`${mode} call error, trying the run with other mode`);
      result =
        mode == 'attended'
          ? await requestMapUnattended(input)
          : await requestMapAttended(input);
    }
  }

  return result;
};

/**
 *
 * @param input
 * @description
 */
export const requestMapUnattended = async (
  input: MapQGISParamsType
): Promise<RequestMapResponse> => {
  const url = PowerautomateUrls.MapGeneration.unattended;
  const res = await fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(input),
  });
  const data: RequestMapResponse = await res.json();
  console.log('requestMap and wait result:', data);
  return data;
};

/**
 *
 * @param input
 * @returns
 */
export const requestMapAttended = async (
  input: MapQGISParamsType
): Promise<RequestMapResponse> => {
  const url = PowerautomateUrls.MapGeneration.attended;
  const res = await fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(input),
  });
  const data: RequestMapResponse = await res.json();
  console.log('requestMap and wait result:', data);
  return data;
};
