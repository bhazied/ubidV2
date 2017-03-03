<?php

namespace ContinuousNet\BiodyXpertBundle\Controller;

use ContinuousNet\BiodyXpertBundle\Entity\Measurement;
use ContinuousNet\BiodyXpertBundle\Form\MeasurementType;

use Symfony\Component\HttpFoundation\Request;
use Symfony\Bundle\FrameworkBundle\Controller\Controller;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\Method;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\Route;

/**
 * Measurement Controller
 * 
 * Manage Measurements 
 * 
 * PHP version 5.4.4
 * 
 * @category   Symfony 2 Controller
 * @package	ContinuousNet\BiodyXpertBundle\Controller
 * @author	 Sahbi KHALFALLAH <sahbi.khalfallah@continuousnet.com>
 * @copyright  2017 CONTINUOUS NET
 * @license	CONTINUOUS NET REGULAR LICENSE
 * @version	Release: 1.0
 * @link	   http://biodyxpert.continuousnet.com/ContinuousNet/BiodyXpertBundle/Controller
 * @see		MeasurementController
 * @since	  Class available since Release 1.0
 * @access	 public
 * @Route("/measurement")
 */
class MeasurementController extends BaseController
{
	/**
	 * Lists all Measurement entities.
	 *
	 * @Route("/", name="measurement_index")
	 * @Method("GET")
	 */
	public function indexAction()
	{
		$em = $this->getDoctrine()->getManager();

		$measurements = $em->getRepository('BiodyXpertBundle:Measurement')->findAll();

		return $this->render('BiodyXpertBundle:Measurement:index.html.twig', array(
			'measurements' => $measurements,
		));
	}

	/**
	 * Creates a new Measurement entity.
	 *
	 * @Route("/new", name="measurement_new")
	 * @Method({"GET", "POST"})
	 */
	public function newAction(Request $request)
	{
		$measurement = new Measurement();
		$form = $this->createForm('ContinuousNet\BiodyXpertBundle\Form\MeasurementType', $measurement);
		$form->handleRequest($request);

		if ($form->isSubmitted() && $form->isValid()) {
			$em = $this->getDoctrine()->getManager();
			$em->persist($measurement);
			$em->flush();

			return $this->redirectToRoute('measurement_show', array('id' => $measurement->getId()));
		}

		return $this->render('BiodyXpertBundle:Measurement:new.html.twig', array(
			'measurement' => $measurement,
			'form' => $form->createView(),
		));
	}

	/**
	 * Finds and displays a Measurement entity.
	 *
	 * @Route("/{id}", name="measurement_show")
	 * @Method("GET")
	 */
	public function showAction(Measurement $measurement)
	{
		$deleteForm = $this->createDeleteForm($measurement);

		return $this->render('BiodyXpertBundle:Measurement:show.html.twig', array(
			'measurement' => $measurement,
			'delete_form' => $deleteForm->createView(),
		));
	}

	/**
	 * Displays a form to edit an existing Measurement entity.
	 *
	 * @Route("/{id}/edit", name="measurement_edit")
	 * @Method({"GET", "POST"})
	 */
	public function editAction(Request $request, Measurement $measurement)
	{
		$deleteForm = $this->createDeleteForm($measurement);
		$editForm = $this->createForm('ContinuousNet\BiodyXpertBundle\Form\MeasurementType', $measurement);
		$editForm->handleRequest($request);

		if ($editForm->isSubmitted() && $editForm->isValid()) {
			$em = $this->getDoctrine()->getManager();
			$em->persist($measurement);
			$em->flush();

			return $this->redirectToRoute('measurement_edit', array('id' => $measurement->getId()));
		}

		return $this->render('BiodyXpertBundle:Measurement:edit.html.twig', array(
			'measurement' => $measurement,
			'edit_form' => $editForm->createView(),
			'delete_form' => $deleteForm->createView(),
		));
	}

	/**
	 * Deletes a Measurement entity.
	 *
	 * @Route("/{id}", name="measurement_delete")
	 * @Method("DELETE")
	 */
	public function deleteAction(Request $request, Measurement $measurement)
	{
		$form = $this->createDeleteForm($measurement);
		$form->handleRequest($request);

		if ($form->isSubmitted() && $form->isValid()) {
			$em = $this->getDoctrine()->getManager();
			$em->remove($measurement);
			$em->flush();
		}

		return $this->redirectToRoute('measurement_index');
	}

	/**
	 * Creates a form to delete a Measurement entity.
	 *
	 * @param Measurement $measurement The Measurement entity
	 *
	 * @return \Symfony\Component\Form\Form The form
	 */
	private function createDeleteForm(Measurement $measurement)
	{
		return $this->createFormBuilder()
			->setAction($this->generateUrl('measurement_delete', array('id' => $measurement->getId())))
			->setMethod('DELETE')
			->getForm()
		;
	}
}
