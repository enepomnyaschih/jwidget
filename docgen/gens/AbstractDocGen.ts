import Program from '../model/Program';

interface AbstractDocGen<P> {

	parseParams(): P;
	generateDocs(program: Program, params: P): void;
}

export default AbstractDocGen;
